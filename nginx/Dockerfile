FROM nginx:1.21
RUN rm -f /etc/nginx/conf.d/*

COPY conf.d/nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY /nginx.conf /etc/nginx/nginx.conf

CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/conf.d/nginx.conf
# CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf

# ポート設定
# EXPOSE 80
