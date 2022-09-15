#!/usr/bin/env python

import sys
from os.path import exists
from os import environ

if len(sys.argv) != 3 or not(exists(sys.argv[1])):
    print("Usage: add_relstorage custom.cfg migration.conf")
    print("  adds [instance] relstorage config to custom.cfg and creates migration.conf")
    exit(1)

init = __import__('docker-initialize')
env = init.Environment()

with open(sys.argv[1], 'a') as config:
    config.write(init.RELSTORAGE_TEMPLATE.format(
        relstorage=env.relstorage_conf()
    ))

# also create config in case we want to migrate

MIGRATION_TEMPLATE = """
<filestorage source>
  path /data/filestorage/Data.fs
  blob-dir /data/blobstorage
</filestorage>

<relstorage destination>
    blob-dir {blobcache}
    <postgresql>
        dsn dbname='{dbname}' user='{user}' host='{host}' password='{password}'
    </postgresql>
</relstorage>
"""

adapter_options = {kv[0].strip(): kv[1].strip() for kv in (option.split(' ') for option in environ.get(
    "RELSTORAGE_ADAPTER_OPTIONS",
    "",
).strip().split(","))}

if adapter_options.get('type') != 'postgresql':
    print('Only postgresql is supported currently.')
    exit(1)

with open(sys.argv[2], 'w') as migration:
    migration.write(MIGRATION_TEMPLATE.format(
        dbname=adapter_options.get('dbname'),
        user=adapter_options.get('user'),
        host=adapter_options.get('host'),
        password=adapter_options.get('password'),
        blobcache=environ.get('RELSTORAGE_BLOB_DIR')
    ))