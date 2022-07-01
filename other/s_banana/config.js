const protocol = 'https:'
const host = '6jwti3892pf605m004mn.lagoapps.com'
const origin = protocol + '//' + host
const query = {
	device: 'iPhone 7 13.4 1.0',
	s_device_id: '374B5729-7F3F-4C8F-B6DE-80FF0A333633',
	s_os_version: '13.4',
	s_platform: 'ios',
	_t: '1587401036000'
}
module.exports = {
	protocol,
	host,
	origin,
	home: origin + '/index',
	query: () => ({ ...query, _t: new Date().valueOf(), s_device_id: query.s_device_id + '-' + new Date().valueOf() + '-' + Math.random().toString().slice(2, 8) }),
	// query: () => ({ ...query }),
	dataSourceTxtName: 'dist_deploy/dataSource.txt'
}

