import sys
from urllib.parse import urlparse

if len(sys.argv) < 2 or not sys.argv[1]:
  print('Please pass URL as argument.')
  exit(1)

url = urlparse(sys.argv[1])

domain = url.hostname

"""
  Note that standard http port 80 and https port 443 requests
  don't require a port to be specified. A port is only required in the whitelisted host name
  if you are authenticating against a non-standard port e.g. localhost:3001

  e.g.:
  ["localhost:3001", "foo.com", "bar.com"]
 """

if url.port and url.port not in [80, 443]:
  domain += ':' + str(url.port)

print(domain)
