excludes = %w(.* R* cgi-bin *.haml artwork)
exclude_options = excludes.map { |e| "--exclude=#{e}" }.join(" ")
SETTINGS = {
  :rsync_server  => "letmegooglethatforyou.com:~/www",
  :rsync_options => "-e ssh -avz --delete #{exclude_options}"
}

task :default => [:build, :open] do
  autobuild
end

task :open do
  sh("open index.html")
end

desc "build the html"
task :build do
  print "Building..."
  sh("haml index.haml index.html")
  puts "done."
end

desc "publish this wicked site to the world"
task :publish => :build do
  sh("rsync #{SETTINGS[:rsync_options]} ./ #{SETTINGS[:rsync_server]}")
end

def autobuild
  puts "Starting autobuild (Ctrl-C to stop)\n"
  @watcher = DirectoryWatcher.new '.', :interval => 0.25
  @watcher.glob = "*.haml"
  @watcher.add_observer do |*events|
    Rake::Task[:build].reenable
    Rake::Task[:build].invoke
  end
  Signal.trap('INT') { @watcher.stop }
  @watcher.start
  @watcher.join
end

begin
  require "directory_watcher"
rescue LoadError
  puts "You are missing a required dependency. Please run:"
  puts "  sudo gem install directory_watcher"
  exit 1
end
