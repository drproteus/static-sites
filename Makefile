.PHONY: goritski
goritski:
	rsync -azvh --delete gorit.ski/ perfect-blue:/var/www/html/gorit.ski

.PHONY: jakeg
jakeg:
	rsync -azvh --delete jake.gorit.ski/ perfect-blue:/var/www/html/jake.gorit.ski

.PHONY: blog
blog:
	cd jakeg.dev && make dist
	rsync -azvh --delete jakeg.dev/dist/ perfect-blue:/var/www/html/jakeg.dev

.PHONY: all
all: goritski jakeg blog
