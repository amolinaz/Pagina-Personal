use strict;
use warnings;
use HTTP::Daemon;
use HTTP::Status;
use File::Spec;
use FindBin;
use Cwd qw(abs_path);

my $root = abs_path(File::Spec->catdir($FindBin::Bin, File::Spec->updir()));
my $d = HTTP::Daemon->new(LocalAddr => '127.0.0.1', LocalPort => 5500, ReuseAddr => 1) or die "Could not start server: $!";
print "Serving $root on ", $d->url, "\n";

my %mime = (
  '.html' => 'text/html; charset=utf-8', '.css' => 'text/css', '.js' => 'application/javascript',
  '.svg' => 'image/svg+xml', '.png' => 'image/png', '.jpg' => 'image/jpeg', '.jpeg' => 'image/jpeg',
  '.ico' => 'image/x-icon', '.xml' => 'application/xml', '.txt' => 'text/plain',
  '.webmanifest' => 'application/manifest+json', '.json' => 'application/json'
);

while (my $c = $d->accept) {
  while (my $r = $c->get_request) {
    my $path = $r->uri->path;
    $path = '/index.html' if $path eq '/';
    my $file = File::Spec->catfile($root, split m{/}, $path);
    if (-f $file) {
      my ($ext) = $file =~ /(\.[^.\/]+)$/;
      my $type = $mime{lc($ext // '')} // 'application/octet-stream';
      open(my $fh, '<:raw', $file) or do { $c->send_error(500); next; };
      local $/;
      my $content = <$fh>;
      close $fh;
      my $res = HTTP::Response->new(200, 'OK', ['Content-Type' => $type], $content);
      $c->send_response($res);
    } else {
      $c->send_error(404);
    }
  }
  $c->close;
  undef($c);
}
