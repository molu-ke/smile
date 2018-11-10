let service='dev';
// let service='prod';


let mainUrl;//主域名
if (service == 'dev') {
	mainUrl = '/api/'
} else if (service = 'prod') {
	mainUrl = 'https://minih.bnln100.com/'
}

export{
    mainUrl
}
