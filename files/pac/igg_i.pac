
var proxy = "HTTPS hkhkt4.igginstall.xyz:6443;HTTPS hkhkt1.igginstall.xyz:5443; DIRECT";

var direct = 'DIRECT;';
var domainsUsingProxy = ["googleapis.com","googlecode.com","googleusercontent.com","ggpht.com","gstatic.com","chrome.google.com","clients1.google.com","clients2.google.com","clients3.google.com","clients4.google.com","clients5.google.com","clients6.google.com","clients7.google.com","clients8.google.com","clients9.google.com","sb-ssl.google.com","play.google.com"];

var localTlds = {
  ".localhost": 1, 
  ".test": 1
};

function to_dict(domains) {
    var domain_dict = {};
    for (var i = 0; i < domains.length; i++) {
        if (domains[i].endsWith(".")) {
            domains[i] = domains[i].slice(0, -1)
        }
        var url_list = domains[i].split('.');

        var domain_node = domain_dict;
        for (var j = url_list.length; j > 0; j--) {
            var node_name = url_list[j - 1];
            if (!domain_node.hasOwnProperty(node_name)) {
                if (j === 1) {
                    domain_node[node_name] = true;
                    break;
                } else {
                    domain_node[node_name] = {};
                }
            } else if (domain_node[node_name] === true) {
                break;
            }
            domain_node = domain_node[node_name];
        }
    }
    return domain_dict;
}

domainsUsingProxy = to_dict(domainsUsingProxy);

var hasOwnProperty = Object.hasOwnProperty;

var ipRegExp = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);

function convertAddress(ipchars) {
    var bytes = ipchars.split('.');
    var result = ((bytes[0] & 0xff) << 24) |
                 ((bytes[1] & 0xff) << 16) |
                 ((bytes[2] & 0xff) <<  8) |
                  (bytes[3] & 0xff);
    return result;
}

function testDomain(host, domain_dict) {
    var host_list = host.split('.')
    var domain_node = domain_dict
    for (var i = host_list.length; i > 0; i--) {
        var node_name = host_list[i - 1]
        if (domain_node.hasOwnProperty(node_name)) {
            if (domain_node[node_name] === true) {
                return true;
            } else {
                domain_node = domain_node[node_name]
            }

        }
        else {
            return false;
        }
    }
    return false;
}


function isLocalTestDomain(domain) {
    // Chrome uses .test as testing gTLD.
    var tld = domain.substring(domain.lastIndexOf('.'));
    if (tld === domain) {
        return false;
    }
    return Object.hasOwnProperty.call(localTlds, tld);
}

function isPrivateIp(ip) {
  return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
  /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
  /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
  /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
  /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) ||
  /^f[cd][0-9a-f]{2}:/i.test(ip) ||
  /^fe80:/i.test(ip) ||
  /^::1$/.test(ip) ||
  /^::$/.test(ip);
}

function FindProxyForURL(url, host) {
    if (isPlainHostName(host)
     || isPrivateIp(host)
     || isLocalTestDomain(host)
     || host === 'localhost') {
        return direct;
    }

    if (!ipRegExp.test(host)) {
        if (testDomain(host, domainsUsingProxy)) {
            return proxy;
        }
    } 

    return direct;
}
