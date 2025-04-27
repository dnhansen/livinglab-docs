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
  - title: "Packages"
    content: |
      In the following table, `X` refers to the most recent stable release of PostgreSQL available for the operating system, and `Y` refers to the latest version of .NET.

      | Element | Debian | Red Hat |
      | ------- | ------ | ----------- |
      | PostgreSQL server | `postgresql-X` | `postgresqlX-server` |
      | PostgreSQL client | `postgresql-client-X` | `postgresqlX` |
      | ASP.NET Core Runtime | `aspnetcore-runtime-Y` | `aspnetcore-runtime-Y` |
      | Nginx | `nginx` | `nginx` |

      Note the following:

      - The PostgreSQL server packages depend on the client packages.

      - The ASP.NET Core Runtime depends on the .NET Runtime (TODO at least on RH, but on Debian?).
      
      - The latest PostgreSQL version included in Debian 12.x (bookworm) is version 15. To install newer versions of both `postgresql-X` and `postgresql-client-X`, first install the package `postgresql-common` (which is a dependency of both of the former packages), and then run the script

            /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

        to add the repository. Finally install the relevant package(s). See also [PostgreSQL's instructions](https://www.postgresql.org/download/linux/debian/) for installing the package(s).
      
      - The latest PostgreSQL version included in Red Hat 9 is version 16 (as a module). To install newer versions of both `postgresqlX-server` and `postgresqlX`, first install the PostgreSQL repository:

            dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm
        
        Then disable the built-in PostgreSQL module:

            dnf -qy module disable postgresql
        
        Finally install the relevant package(s). See also [PostgreSQL's instructions](https://www.postgresql.org/download/linux/redhat/) for installing the package(s).
      
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

      When installing PostgreSQL on Debian, the database cluster is automatically initialised, and the `postgresql` service is also automatically enabled and started. For more information, see the [Debian wiki's PostgreSQL page](https://wiki.debian.org/PostgreSql). However, on Red Hat this is not the case, so it is necessary to manually perform these tasks.

      The main configuration files are `postgresql.conf` and `pg_hba.conf`. On Red Hat, these are located in the data directory `/var/lib/pgsql/<version>/data/`. On Debian they are instead located in `/etc/postgresql/<version>/<cluster>/`, where `<cluster>` is the name of the database cluster, usually `main`. The command `pg_lsclusters` shows all clusters.
      
      To configure the installation of the PostgreSQL server, perform the following actions on the database server.

      1. (Red Hat, optional) If commands such as `pg_ctl` are not immediately available on the `PATH`, add the `/usr/pgsql-<version>/lib` directory to `PATH`.

      2. (Red Hat) Initialise the database cluster (create data directory, config files, etc. in `/var/lib/pgsql`):
             
             postgresql-X-setup initdb

      3. Allow external connections: In `postgresql.conf`, change the value of `listen_addresses` to `'*'`.

      4. Allow connections from the application server: In `pg_hba.conf`, append the line
      
             host    all     all     172.16.2.82/32     trust
         
         Note that the last column `trust` should be changed to configure password authentication. TODO

      5. (Red Hat) Enable and start the PostgreSQL service:

             systemctl enable postgresql-<version>
             systemctl start postgresql-<version>

      6. (Debian) Restart the PostgreSQL service:

             systemctl restart postgresql

      7. (Red Hat, TODO Debian nftables) Configure firewalld to allow traffic from the application server on port 5432 (TODO check if this is the best way):
      
             sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="172.16.2.82" port port=5432 protocol=tcp accept' --permanent
             sudo firewall-cmd --reload
      
      Afterwards, test the connection on the application server:

          psql -h 172.16.2.81 -U postgres -d postgres

      If the PostgreSQL server is listening on another port than 5432, specify this using the `-p` flag.
      
      TODO: Consider how much of this can be brought under configuration management.

      ### Troubleshooting

      Error:

          Job for postgresql-17.service failed because the control process exited with error code.
      
      More information: Inspect the logs (on Red Hat located in the data directory, TODO check Debian).

      Potential causes:

      - The port 5432 is already in use. If the process listening on 5432 cannot instead listen on another port, change the port PostgreSQL will listen to by changing the value of the variable `port` in `postgresql.conf`.

      - A lock file cannot be created in the directory `/run/postgresql`, either since it does not exist or because the `postgres` system user does not have the right permissions. Ensure that this directory exists and is owned by `postgres`.
    
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
