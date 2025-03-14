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
      In the following table, `X` refers to the most recent stable release of PostgreSQL available for the operating system, and `Y` refers to the desired version of .NET (TODO 8 vs. 9?).

      | Element | Debian | Rocky Linux |
      | ------- | ------ | ----------- |
      | PostgreSQL server | `postgresql-X` | `postgresql:X/server` |
      | PostgreSQL client | `postgresql-client-X` | `postgresql:X/client` |
      | ASP.NET Core Runtime | `aspnetcore-runtime-Y` | `aspnetcore-runtime-Y` |
      | Reverse proxy | `nginx` | `nginx` |

      Note the following:
      - The PostgreSQL server packages depend on the client packages.
      - On Rocky Linux, remember to enable the `postgresql` module before installing PostgreSQL packages.
      - The ASP.NET Core Runtime depends on the .NET Runtime (TODO at least on Rocky, but on Debian?).
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
      - Reverse proxy
      - Back-end application: TODO dll files
      - Front-end: TODO static files
  
      ### Client host
      - Web browser
  - title: "PostgreSQL configuration (Rocky Linux)"
    content: |
      TODO this is temporarily here.

      To configure the installation of the PostgreSQL server, perform the following actions on the database server:

      1. Initialise the database cluster (create data directory, config files, etc. in `/var/lib/pgsql`):
             
             postgresql-setup --initdb

      2. Allow external connections: In `/var/lib/pgsql/data/postgresql.conf`, change the line (TODO check the more secure way to do this)

             listen_addresses = '*'

      3. Allow connections from the application server: In `/var/lib/pgsql/data/pg_hba.conf`, append the line
      
             host    all     all     172.16.2.82/32     trust
         
         Note that the last column `trust` should be changed to configure password authentication. TODO

      4. Enable and start the PostgreSQL service:

             systemctl enable postgresql
             systemctl start postgresql

      5. Configure firewalld to allow traffic from the application server on port 5432 (TODO check if this is the best way):
      
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
             worker_processes 1;
             events {
                 worker_connections 1024;
             }
             http {
                 access_log /dev/stdout;
                 error_log /dev/stderr;
                 server {
                     location / {
                         proxy_pass http://localhost:5000;
                     }
                 }
             }

         This configures Nginx to act as a proxy server for incoming HTTP traffic, redirecting it to `localhost:5000`. Furthermore, Nginx will not act as a daemon, and will output access and error information to standard output and error, respectively.
      
      3. Start Nginx by running `nginx`.
    
      The configuration can be tested by also running an API on the application server listening on port 5000, and sending requests to the application server from a different host.

layout: "layouts/view.njk"
---
