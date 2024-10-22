HOST = perfect-blue
SDF_HOST = sdf
WEB_ROOT = /var/www/html

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
	rsync -azvh --delete gorit.ski/ $(HOST):$(WEB_ROOT)/gorit.ski

.PHONY: jakeg
jakeg:
	rsync -azvh --delete jake.gorit.ski/ $(HOST):$(WEB_ROOT)/jake.gorit.ski

.PHONY: blog
blog:
	cd jakeg.dev && make dist
	rsync -azvh --delete jakeg.dev/dist/ $(HOST):$(WEB_ROOT)/jakeg.dev

.PHONY: static
static:
	rsync -azvh --delete static/ $(HOST):$(WEB_ROOT)/static

.PHONY: dizbiz
dizbiz:
	rsync -azvh --delete dizzy.biz/ $(HOST):$(WEB_ROOT)/dizzy.biz

.PHONY: sdf
sdf:
	rsync -azvh --delete sdf/ $(SDF_HOST):~/html

.PHONY: caddy
caddy: push-caddy
	scp caddy/Caddyfile perfect-blue:/etc/caddy/Caddyfile
	ssh -t $(HOST) 'cd /etc/caddy; sudo caddy reload'

.PHONY: pull-caddy
pull-caddy:
	scp $(HOST):/etc/caddy/Caddyfile caddy/Caddyfile

