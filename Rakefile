require 'rubygems'
require 'closure-compiler'

HEADER = /((^\s*\/\/.*\n)+)/

desc 'Use the Closure Compiler to compress jQuery.quicktip plugin'
task :build do
  source = File.read('lib/jquery.quicktip.js')
  header = source.match(HEADER)
  min = Closure::Compiler.new.compress(source)
  File.open('dist/jquery.quicktip.min.js', 'w') do |file|
    file.write header[1].squeeze(' ') + min
  end
  File.open('dist/jquery.quicktip.css', 'w') do |file|
    file.write File.read('lib/jquery.quicktip.css')
  end
end