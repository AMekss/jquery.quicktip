require 'rubygems'
require 'closure-compiler'

desc 'Use the Closure Compiler to compress jQuery.quicktip plugin'
task :build do
  File.open('dist/jquery.quicktip.min.js', 'w').write \
    Closure::Compiler.new.compile(File.open('lib/jquery.quicktip.js', 'r'))
  File.open('dist/jquery.quicktip.css', 'w').write \
    File.open('lib/jquery.quicktip.css', 'r').read
end
