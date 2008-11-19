SETTINGS = {
  :rsync_server  => "letmegooglethatforyou.com:~/www",
  :rsync_options => "-e ssh -avz --delete --exclude=.git* --exclude=.htaccess --exclude=R* --exclude=cgi-bin --exclude=*.haml"
}

task :default => :build do
  sh("open index.html")
end

desc "build the html"
task :build do
  sh("haml index.haml index.html")
end

desc "publish this wicked site to the world"
task :publish => :build do
  sh("rsync #{SETTINGS[:rsync_options]} ./ #{SETTINGS[:rsync_server]}")
end
