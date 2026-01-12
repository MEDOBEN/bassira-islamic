import footer from './footer.js';
import adhkar from './adhkar.js';
import prayer from './prayer.js';
import quran from './quran.js';
import more from './more.js';
import questions from './questions.js';
import albitaqat from './albitaqat.js';
import hisnmuslim from './hisnmuslim.js';
import radio from './radio.js';
import tfs from './tfs.js';
import allah from './allah.js';
import settings from './settings.js';
import sabha from './sabha.js';
import notification from './notification.js';
import ramadanTime from './ramadanTime.js';
import duas from './duas.js';
import error_handling from './modules/error_handling.js';
import handleAudio from './modules/handleAudio.js';

document.documentElement.style.setProperty('--animate-duration', '1.5s');

// تشغيل التطبيق في المتصفح أو في البيئة العادية
if (window.cordova) {
    document.addEventListener('deviceready', async () => {
        setTheme();
        try {
            const permissions = cordova?.plugins?.permissions;
            const list = [
                permissions?.ACCESS_COARSE_LOCATION,
                permissions?.WRITE_EXTERNAL_STORAGE,
                permissions?.VIBRATE,
                permissions?.POST_NOTIFICATIONS,
                permissions?.SCHEDULE_EXACT_ALARM
            ];
            permissions?.hasPermission(list, (status) => {
                if (!status.hasPermission) {
                    permissions?.requestPermissions(list);
                }
            });
            if (window.MobileAccessibility) {
                window.MobileAccessibility.usePreferredTextZoom(false);
            }
        } catch (error) {
            error_handling(error);
        }
        await setupApplication();
    }, false);
} else {
    // للمتصفح
    setTheme();
    setupApplication();
}

async function setupApplication() {
    await footer();
    await adhkar();
    await prayer();
    await quran();
    await more();
    await questions();
    await albitaqat();
    await hisnmuslim();
    await radio();
    await tfs();
    await allah();
    await settings();
    await sabha();
    await notification();
    await ramadanTime();
    await duas();

    // احصل على جميع عناصر img
    const imagesAll = document.querySelectorAll('img');

    // تعيين خاصية loading="lazy" لكل عنصر img
    imagesAll?.forEach(img => {
        img?.setAttribute('loading', 'lazy');
    });

    await handleAudio(); // تشغيل الصوت في جميع الصفحات

}

function setTheme() {
    const storage = window.localStorage;
    const getTheme = storage.getItem("themeStorage") || "theme_1";
    
    const themes = {
        theme_1: { navColor: "#ffffff", statusColor: '#f5f6fa' },
        theme_2: { navColor: "#0c1128", statusColor: '#141e46' },
        theme_3: { navColor: "#262723", statusColor: '#38382e' },
        theme_4: { navColor: "#94b0ff", statusColor: '#acc2fd' },
        theme_5: { navColor: "#0b3f43", statusColor: '#0b3f43' },
        theme_6: { navColor: "#1e272e", statusColor: '#1e272e' },
    };

    const theme = themes[getTheme];
    if (typeof NavigationBar !== 'undefined') {
        NavigationBar.backgroundColorByHexString(theme.navColor, false);
    }
    if (typeof StatusBar !== 'undefined') {
        StatusBar.backgroundColorByHexString(theme.statusColor);
    }

    document.querySelector("html").setAttribute("data-theme", getTheme);
}