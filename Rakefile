task :default => :build do
  sh("open index.html")
end

desc 'build the html'
task :build do
  sh("haml index.haml index.html")
end

desc 'publish this wicked stuff to the world'
task :publish => :build do
  sh("scp -r *.html *.js images letmegooglethatforyou.com:~/www")
end
