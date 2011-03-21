#!/usr/bin/make
# to automatize repeatitive actions

PROJECT_NAME=pacmaze
APACHE2_CONFFILE=/etc/apache2/sites-enabled/pacmazecom.conf

server:
	node lib/server.js

build:
	inliner http://localhost/~jerome/webwork/pacmaze/www/index.html > build/index.html

.PHONY: build

#################################################################################
#		Apache2								#
#################################################################################

apache2_install_prod: apache2_copy_conf_prod apache2_restart

apache2_install_dev: apache2_copy_conf_dev apache2_restart

apache2_restart:
	sudo /etc/init.d/apache2 restart

apache2_copy_conf_dev:
	sudo ln -fs $(PWD)/etc/pacmazecom_dev_siteconf $(APACHE2_CONFFILE)

apache2_copy_conf_prod:
	sudo ln -fs $(PWD)/etc/pacmazecom_prod_siteconf $(APACHE2_CONFFILE)

#################################################################################
#		deploy								#
#################################################################################

deploy:	build deployDedixl

deployDedixl:
	rsync -avz --rsh=ssh build/ dedixl:/var/www/pacmaze
