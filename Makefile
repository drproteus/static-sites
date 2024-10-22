.PHONY: goritski
goritski:
	rsync -azvh --delete gorit.ski/ perfect-blue:/var/www/html/gorit.ski

.PHONY: jakeg
jakeg:
	rsync -azvh --delete jake.gorit.ski/ perfect-blue:/var/www/html/jake.gorit.ski

.PHONY: all
all: goritski jakeg
