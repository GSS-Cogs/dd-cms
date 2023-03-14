# Patching
# --------
# Convenence script for applying any patches (literally, the linux patch command)
# see diff approach here: https://www.thegeekstuff.com/2014/12/patch-command-examples/

# This can be useful in certain circumstances as the patch diff is applied after
# dependency installation but before evaluation (python is not compiled).
# This should principally be a development tool for debugging particualarly complex
# problem and you shouldn't be patching anything for deployment without checking with
# a tech lead.
# NOTE - NEVER patch a dynamic dependencies, strictly pinned dependencies please.

# Docker example
# - 1. Get file MyFile.py from container with `docker cp` from <path in container>/MyFile.py
# - 2. Create variaiton of it named ModifiedMyFile.py
# - 3. diff -u ./MyFile.py ./ModifiedMyFile.py > <this /scripts dir>/myfile.patch
# add the following line to this bash script
# `patch <path in container>/MyFile.py /plone/instance/scripts/myfile.patch`

# Any patches thus defined will be called automatically at the correct time during
# the build process.