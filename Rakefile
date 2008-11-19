task :default => :build

desc 'build the html'
task :build do
  sh("haml index.haml index.html")
end

desc 'publish this wicked stuff to the world'
task :publish do
  sh("scp -r *.html *.js images letmegooglethatforyou.com:~/www")
end
