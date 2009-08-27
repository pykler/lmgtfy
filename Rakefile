excludes = %w(.* R* cgi-bin *.haml artwork javascript)
exclude_options = excludes.map { |e| "--exclude=#{e}" }.join(" ")
SETTINGS = {
  :rsync_server  => "lmgtfy.com:/u/apps/lmgtfy",
  :rsync_options => "-e ssh -avz --delete #{exclude_options}"
}

task :default => [:build, :open] do
  autobuild
end

task :open do
  sh("open http://lmgtfy.local/")
end

desc "build the html"
task :build do
  print "Building..."
  sh("haml index.haml index.html")
  sh("haml advertise.haml advertise.html")
  sh("haml privacy.haml privacy.html")
  sh("cat javascript/jquery*.js javascript/helpers.js javascript/application.js > bundle.js")
  puts "done."
end

desc "publish this wicked site to the world"
task :publish => :build do
  sh("rsync #{SETTINGS[:rsync_options]} ./ #{SETTINGS[:rsync_server]}")
end

def autobuild
  puts "Starting autobuild (Ctrl-C to stop)\n"
  @watcher = DirectoryWatcher.new '.', :interval => 0.25
  @watcher.glob = %w(*.{haml,sass} javascript/*.js)
  @watcher.add_observer do |*events|
    Rake::Task[:build].execute
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
