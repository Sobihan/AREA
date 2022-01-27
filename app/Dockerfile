FROM cirrusci/flutter:latest
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN flutter pub get
CMD ["flutter", "build", "apk"]
