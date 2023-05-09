"""
Python script to append database connection details to zope.conf.

The key consideration here is this happens at STARTUP (before zope runs)
not BUILD so allows us to use the same docker image across multiple
environments via injecting appropriate env vars (i.e this restores more
typical application behaviour).
"""

import os

# Read the environment variables
postgres_db = os.environ.get("POSTGRES_DB")
postgres_user = os.environ.get("POSTGRES_USER")
postgres_host = os.environ.get("POSTGRES_HOST")
postgres_password = os.environ.get("POSTGRES_PASSWORD")
assert postgres_password != "", 'Aborting, you must provide a POSTGRES_PASSWORD environment variable.'

# Construct the db section as a string
relstorage_section = f"""
<zodb_db main>
# Main database
cache-size 30000
%import relstorage
<relstorage>
    blob-dir /data/blob-cache
    <postgresql>
        dsn dbname={postgres_db} user={postgres_user} host={postgres_host} port=5432 password={postgres_password}
    </postgresql>
</relstorage>
mount-point /
</zodb_db>
<zodb_db temporary>
# Temporary storage database (for sessions)
<temporarystorage>
    name temporary storage for sessioning
</temporarystorage>
mount-point /temp_folder
container-class Products.TemporaryFolder.TemporaryContainer
</zodb_db>
python-check-interval 1000
"""

# Get the intiial zope file (with no database connection details)
with open("/plone/instance/parts/instance/etc/zope-unmodified.conf") as f:
    zope_unmodified = f.read()

    # Write the zope.conf consisiting of:
    # - initial zope.conf soured from ../zope.conf
    # - the database connection details defined above
    with open("/plone/instance/parts/instance/etc/zope.conf", "w") as f2:
        f2.write(zope_unmodified)
        f2.write(relstorage_section)