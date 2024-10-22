.PHONY: usage
usage:
	@echo "Run make <site> to upload to remote host."
	@echo "* goritski -> gorit.ski"
	@echo "* jakeg -> jake.gorit.ski"
	@echo "* blog -> jakeg.dev"
	@echo "* static -> static.skinet.org"
	@echo "* dizbiz -> dizzy.biz"
	@echo "* sdf -> jakeg.sdf.org"
	
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

.PHONY: dizbiz
dizbiz:
	rsync -azvh --delete dizzy.biz/ perfect-blue:/var/www/html/dizzy.biz

.PHONY: sdf
sdf:
	rsync -azvh --delete sdf/ sdf:~/html

.PHONY: caddy
caddy: push-caddy
	scp caddy/Caddyfile perfect-blue:/etc/caddy/Caddyfile
	ssh -t perfect-blue 'cd /etc/caddy; sudo caddy reload'

.PHONY: pull-caddy
pull-caddy:
	scp perfect-blue:/etc/caddy/Caddyfile caddy/Caddyfile

