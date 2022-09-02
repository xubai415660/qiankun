FROM 192.168.1.237:5000/kubesphere/nginx:1.19.10-cj
MAINTAINER gqb
COPY dist/ami-mf0999-demo/  /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
