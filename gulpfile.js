var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var path = require('path');

gulp.task('webserver',function(){

   connect.server({
   		host: '0.0.0.0',
      	livereload:true,
      	port:8666,
		middleware: function(connect, opt) {
            return [
                proxy('/simpleReg',  {
                    target: 'https://dev2home.uuabc.com',
                    changeOrigin: true,
                    secure: false,
                }),
                proxy('/mVerification',  {
                    target: 'https://dev2home.uuabc.com',
                    changeOrigin: true,
                    secure: false,
                }),
                proxy('/other/',  {
                    target: 'http://localhost:3000/',
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: {
                    	'^/other' : '/'
                    }
                })
            ]
        }
   });

});

gulp.task('default',['webserver']);