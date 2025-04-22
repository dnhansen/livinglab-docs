---
title: "Installation"
description: |
  This view describes the software elements that need to be installed to move the system into production.
stakeholderConcerns: "TODO"
sections:
  - title: null
    content: |
      TODO figure out best way to handle versioning of dependencies.

      This view assumes that the database server and application server are distinct hosts.
  - title: "Packages/modules"
    content: |
      In the following table, `X` refers to the most recent stable release of PostgreSQL available for the operating system, and `Y` refers to the latest version of .NET.

      | Element | Debian | Rocky Linux |
      | ------- | ------ | ----------- |
      | PostgreSQL server | `postgresql-X` | `postgresql:X/server` |
      | PostgreSQL client | `postgresql-client-X` | `postgresql:X/client` |
      | ASP.NET Core Runtime | `aspnetcore-runtime-Y` | `aspnetcore-runtime-Y` |
      | Nginx | `nginx` | `nginx` |

      Note the following:

      - The PostgreSQL server packages depend on the client packages.

      - On Rocky Linux, remember to enable the `postgresql` module before installing PostgreSQL packages.

      - The ASP.NET Core Runtime depends on the .NET Runtime (TODO at least on Rocky, but on Debian?).
      
      - The latest PostgreSQL version included in Debian 12.x (bookworm) is version 15. To install newer versions of both `postgresql-X` and `postgresql-client-X`, first install the package `postgresql-common` (which is a dependency of both of the former packages), and then run the script

            /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

        to add the repository. See also [PostgreSQL's instructions](https://www.postgresql.org/download/linux/debian/) for installing the package.
      
      - The ASP.NET Core Runtime is not included in Debian's default package directory, so to install the package `aspnetcore-runtime-Y`, it is necessary to first install the package `packages-microsoft-prod.deb` from the [Linux software repository for Microsoft products](https://packages.microsoft.com/config/debian/). See also [Microsoft's instructions](https://learn.microsoft.com/en-us/dotnet/core/install/linux-debian) (TODO wget vs. curl?) for installing the package.
  - title: "Deployment on hosts"
    content: |
      ### Database server
      - Operating system
      - PostgreSQL server
      - PostgreSQL client
      - Database schemas: TODO installation (and configuration management)
  
      ### Application server
      - Operating system
      - PostgreSQL client
      - ASP.NET Core Runtime
      - Nginx
      - Back-end application: TODO dll files
      - Front-end: TODO static files
  
      ### Client host
      - Web browser
  - title: "PostgreSQL configuration"
    content: |
      TODO this is temporarily here.

      When installing PostgreSQL on Debian, the database cluster is automatically initialised, and the `postgresql` service is also automatically enabled and started. For more information, see the [Debian wiki's PostgreSQL page](https://wiki.debian.org/PostgreSql). However, on Rocky Linux this is not the case, so it is necessary to manually perform these tasks.

      The main configuration files are `postgresql.conf` and `pg_hba.conf`. These are located in the following directories (TODO Debian cluster name):

      | File | Debian | Rocky Linux |
      | ---- | ------ | ----------- |
      | `postgresql.conf` | `/etc/postgresql/<version>/<cluster>/` | `/var/lib/pgsql/data/` |
      | `pg_hba.conf` | `/etc/postgresql/<version>/<cluster>/` | `/var/lib/pgsql/data/` |
      
      To configure the installation of the PostgreSQL server, perform the following actions on the database server. Only perform actions labeled "Rocky Linux" if the database server is running Rocky Linux.

      1. (Rocky Linux) Initialise the database cluster (create data directory, config files, etc. in `/var/lib/pgsql` (TODO where is this in Debian?)):
             
             postgresql-setup --initdb

      2. Allow external connections: In `postgresql.conf`, change the line (TODO check the more secure way to do this)

             listen_addresses = '*'

      3. Allow connections from the application server: In `pg_hba.conf`, append the line
      
             host    all     all     172.16.2.82/32     trust
         
         Note that the last column `trust` should be changed to configure password authentication. TODO

      4. (Rocky Linux) Enable and start the PostgreSQL service:

             systemctl enable postgresql
             systemctl start postgresql

      5. (Rocky Linux, TODO Debian nftables) Configure firewalld to allow traffic from the application server on port 5432 (TODO check if this is the best way):
      
             sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="172.16.2.82" port port=5432 protocol=tcp accept' --permanent
             sudo firewall-cmd --reload
      
      Afterwards, test the connection on the application server:

          psql -h 172.16.2.81 -U postgres -d postgres
      
      TODO: Consider how much of this can be brought under configuration management.
    
  - title: "Nginx configuration"
    content: |
      TODO this is also temporarily here.

      Perform the following actions on the application server:

      1. Allow HTTP traffic through the firewall:

             firewall-cmd --permanent --add-service=http
             firewall-cmd --reload
      
      2. Modify `/etc/nginx/nginx.conf` to the following:

             daemon off;
             events {}
             http {
                 access_log /dev/stdout;
                 error_log /dev/stderr;
                 server {
                     listen 80;
                     location / {
                         proxy_pass http://localhost:5000;
                     }
                 }
             }

         This configures Nginx to act as a proxy server for incoming HTTP traffic, redirecting it to `localhost:5000`. Furthermore, Nginx will not act as a daemon, and will output access and error information to standard output and error, respectively.
      
      3. Start Nginx by running `nginx`.
    
      The configuration can be tested by also running an API on the application server listening on port 5000, and sending requests to the application server from a different host.
  
  - title: "SELinux configuration"
    content: |
      By default, SELinux is likely to block Nginx from connecting to port 5000 on localhost, at least when Nginx runs as a service. To allow this, create a custom policy module as follows:

      1. Run the Nginx service.

      2. Find the domain under which Nginx runs:

             ps -eZ | grep nginx
        
         In the present case, the domain is `httpd_t`.
      
      3. Find the label attached to the desired port, here 5000:

             semanage port -l | grep 5000
         
         In this case the label is `commplex_main_port_t`.
      
      4. Create a custom policy module `nginx_commplex.te` (this file can be saved anywhere):

             module nginx_commplex 1.0;
             require {
                 type httpd_t;
                 class tcp_socket name_connect;
                 type commplex_main_port_t;
             }
             allow httpd_t commplex_main_port_t:tcp_socket name_connect;

      5. Compile the module:

             checkmodule -M -m -o nginx_commplex.mod nginx_commplex.te
             semodule_package -o nginx_commplex.pp -m nginx_commplex.mod

      6. Install the module:

             semodule -i nginx_commplex.pp
        
         The `.mod` and `.pp` files can then safely be deleted.
      
      To uninstall the module, run the command:

          semodule -r nginx_commplex

layout: "layouts/view.njk"
---
