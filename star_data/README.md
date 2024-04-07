# Catalogs

## Yale Bright Star Catalog

file: BSC5
size: 285kb

9,110 stars in a binary format.  For complete details see: http://tdc-www.harvard.edu/catalogs/bsc5.html


## Hipparcos Catalog

file: hip_main.dat
size: 51mb

118,218 stars in an ascii format.  I've also created a gzip format which is only 15mb
description of the data format is available here:
https://cdsarc.u-strasbg.fr/ftp/cats/I/239/ReadMe


## Special Format

Since we really only need the catalog ID, RA, DEC and Magnitude, we should probably come up with a format that works best for the front and and trim down/convert the HIP catalog.  RA/DEC are generally in Hour minute second or degree / second formats... so we may want to also convert these to decimal.  Whatever is most effective for the front-end! 
