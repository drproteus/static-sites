.PHONY: usage
usage:
	@echo "Run make <site> to upload to remote host."
	@echo "* goritski -> gorit.ski"
	@echo "* jakeg -> jake.gorit.ski"
	@echo "* blog -> jakeg.dev"
	@echo "* static -> static.skinet.org"
	
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

.PHONY: static
static:
	rsync -azvh --delete static/ perfect-blue:/var/www/html/static

.PHONY: all
all: goritski jakeg blog
