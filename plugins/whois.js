const Asena = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const Axios = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const CON = require('../config');
const Language = require('../language'); 
const Lang = Language.getString('whois'); // Language Support
var ADMİN_USER = ''
var USER_USER = ''
var TR_USER = ''
var Hİ_USER = ''
var AZ_USER = ''
var SRİ_USER = ''
var RU_USER = ''
var USA_USER = ''
var OTHER = ''
if (CON.LANG == 'TR') ADMİN_USER = '*Admin Sayısı:*', USER_USER = '*Üye Sayısı:*', TR_USER = '*Türk Üye Sayısı:*', Hİ_USER = '*Hint Üye Sayısı:*', AZ_USER = '*Azeri Üye Sayısı:*', SRİ_USER = '*Sri Lanka Üye Sayısı:*', RU_USER = '*Rus Üye Sayısı:*', USA_USER = '*ABD Üye Sayısı:*', OTHER = '*Diğer Üye Sayısı:*'
if (CON.LANG == 'EN') ADMİN_USER = '*Admin Count:*', USER_USER = '*Member Count:*', TR_USER = '*Turkish Member Count:*', Hİ_USER = '*Indian Member Count:*', AZ_USER = '*Azerbayjan Member Count:*', SRİ_USER = '*Sri Lanka Member Count:*', RU_USER = '*Russian Member Count:*', USA_USER = '*USA Member Count:*', OTHER = '*Other Member Count:*'
if (CON.LANG == 'AZ') ADMİN_USER = '*Admin sayı:*', USER_USER = '*Üzv sayı:*', TR_USER = '*Türk Üzv Sayısı:*', Hİ_USER = '*Hindistan üzv sayı:*', AZ_USER = '*Azərbaycan Üzv Sayısı:*', SRİ_USER = '*Şri Lanka üzv sayı:*', RU_USER = '*Rusiya Üzv Sayısı:*', USA_USER = '*ABD Üzv sayı:*', OTHER = '*Digər üzv sayı:*'
if (CON.LANG == 'ES') ADMİN_USER = '*Recuento de administradores:*', USER_USER = '*Cuenta de miembro:*', TR_USER = '*Recuento de miembros turcos:*', Hİ_USER = '*Recuento de miembros indios:*', AZ_USER = '*Recuento de miembros de Azerbaiyán:*', SRİ_USER = '*Recuento de miembros de Sri Lanka:*', RU_USER = '*Recuento de miembros rusos:*', USA_USER = '*Recuento de miembros de USA:*', OTHER = '*Otro recuento de miembros:*'
if (CON.LANG == 'PT') ADMİN_USER = '*Contagem de Admin:*', USER_USER = '*Contagem de membro:*', TR_USER = '*Contagem de membros turcos:*', Hİ_USER = '*Contagem de membros indianos:*', AZ_USER = '*Contagem de membros do Azerbaijão:*', SRİ_USER = '*Contagem de membros do Sri Lanka:*', RU_USER = '*Contagem de membros russos:*', USA_USER = '*Contagem de membros dos USA:*', OTHER = '*Contagem de outros membros:*'
if (CON.LANG == 'RU') ADMİN_USER = '*Количество администраторов:*', USER_USER = '*Количество участников:*', TR_USER = '*Количество членов в Турции:*', Hİ_USER = '*Количество членов в Индии:*', AZ_USER = '*Количество участников из Азербайджана:*', SRİ_USER = '*Количество членов из Шри-Ланки:*', RU_USER = '*Количество участников в России:*', USA_USER = '*Количество участников в США:*', OTHER = '*Количество других участников:*'
if (CON.LANG == 'SI') ADMİN_USER = '*💠Admin ගණන:*', USER_USER = '*💠සාමාජිකයන් ගණන:*', TR_USER = '*💠ටර්කි සාමාජිකයන්:*', Hİ_USER = '*💠හින්දි සමාජිකයන්:*', AZ_USER = '*💠AZER සාමාජිකයන්:*', SRİ_USER = '*💠ශ්‍රී ලාංකික සමාජිකයන්:*', RU_USER = '*💠රුසියානු සාමාජිකයන්:*', USA_USER = '*💠USA සාමාජිකයන්:*', OTHER = '*💠වෙනත් සාමාජිකයන්:*'
if (CON.LANG == 'ID') ADMİN_USER = '*Jumlah Admin:*', USER_USER = '*Jumlah anggota:*', TR_USER = '*Jumlah Anggota Turki:*', Hİ_USER = '*Jumlah Anggota India:*', AZ_USER = '*Jumlah Anggota Azerbaijan:*', SRİ_USER = '*Jumlah Anggota Sri Lanka:*', RU_USER = '*Jumlah Anggota Rusia:*', USA_USER = '*Jumlah Anggota USA:*', OTHER = '*Jumlah Anggota Lainnya:*'
if (CON.LANG == 'ML') ADMİN_USER = '*അഡ്‌മിൻ എണ്ണം:*', USER_USER = '*അംഗങ്ങളുടെ എണ്ണം:*', TR_USER = '*ടർക്കിഷ് അംഗങ്ങളുടെ എണ്ണം:*', Hİ_USER = '*ഇന്ത്യൻ അംഗങ്ങളുടെ എണ്ണം:*', AZ_USER = '*അസർബൈജാൻ അംഗങ്ങളുടെ എണ്ണം:*', SRİ_USER = '*ശ്രീലങ്ക അംഗങ്ങളുടെ എണ്ണം:*', RU_USER = '*റഷ്യൻ അംഗങ്ങളുടെ എണ്ണം:*', USA_USER = '*യു‌എസ്‌എ അംഗങ്ങളുടെ എണ്ണം:*', OTHER = '*മറ്റ് അംഗങ്ങളുടെ എണ്ണം:*'

if (CON.WORKTYPE == 'private') {
    Asena.addCommand({ pattern: 'whois$', fromMe: true, desc: Lang.PL_DESC }, async (message, match) => { 
        if (message.jid.includes('-')) {
            var json = await message.client.groupMetadataMinimal(message.jid) 
            var code = await message.client.groupInviteCode(message.jid)
            var nwjson = await message.client.groupMetadata(message.jid) 
            let region = await message.client.groupMetadata(message.jid);
            let grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            var users1 = [];
            grup['participants'].map(async (uye) => {
                if (uye.isAdmin) {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
                users1.push(uye.id.replace('c.us', 's.whatsapp.net'));
            });
            var admin_count = ' ' + jids.length + '\n'
            var user_count = ' ' +  users1.length + '\n'
            var tr_user = [];
            var hi_user = [];
            var az_user = [];
            var sri_user = [];
            var ru_user = [];
            var usa_user = [];
            var other_user = [];
            region['participants'].map(async (reg) => {
                if (reg.jid.startsWith('90')) { tr_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('994')) { az_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('91')) { hi_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('94')) { sri_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('7')) { ru_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('1')) { usa_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } 
            });
            var trus = ' ' + tr_user.length + '\n'
            var hius = ' ' + hi_user.length + '\n'
            var azus = ' ' + az_user.length + '\n'
            var srius = ' ' + sri_user.length + '\n'
            var ruus = ' ' + ru_user.length + '\n'
            var usaus = ' ' + usa_user.length + '\n'
            var oth = user_count - trus - hius - azus - srius - ruus - usaus
            const user_count_msg = ADMİN_USER + admin_count + USER_USER + user_count + TR_USER + trus + Hİ_USER + hius + AZ_USER + azus + SRİ_USER + srius + RU_USER + ruus + USA_USER + usaus + OTHER + ' ' + oth + '\n'
            const msg = `*Grup ID:* ${json.id} \n` + Lang.SUB + `${nwjson.subject} \n` + Lang.OWN + `${json.owner} \n` + Lang.COD + `${code} \n` + user_count_msg + Lang.DES + `\n\n${nwjson.desc}`
            var ppUrl = await message.client.getProfilePicture(message.jid) 
            const resim = await Axios.get(ppUrl, {responseType: 'arraybuffer'})
            await message.sendMessage(
                Buffer.from(resim.data), 
                MessageType.image, 
                {caption: msg }
            );
        }
        else {
            var status = await message.client.getStatus(message.jid) 
            var usppUrl = await message.client.getProfilePicture(message.jid) 
            var usexists = await message.client.isOnWhatsApp(message.jid)
            const nwmsg = Lang.JİD + `${usexists.jid} \n` + Lang.ST + `${status.status}`
            const resimnw = await Axios.get(usppUrl, {responseType: 'arraybuffer'})
            await message.sendMessage(
                Buffer.from(resimnw.data), 
                MessageType.image, 
                { caption: nwmsg }
            );
        }
    });
}
else if (CON.WORKTYPE == 'public') {
    Asena.addCommand({ pattern: 'whois$', fromMe: false, desc: Lang.PL_DESC }, async (message, match) => { 
        if (message.jid.includes('-')) {
            var json = await message.client.groupMetadataMinimal(message.jid) 
            var code = await message.client.groupInviteCode(message.jid)
            var nwjson = await message.client.groupMetadata(message.jid) 
            let region = await message.client.groupMetadata(message.jid);
            let grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            var users1 = [];
            grup['participants'].map(async (uye) => {
                if (uye.isAdmin) {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
                users1.push(uye.id.replace('c.us', 's.whatsapp.net'));
            });
            var admin_count = ' ' +  jids.length + '\n'
            var user_count = ' ' +  users1.length + '\n'
            var tr_user = [];
            var hi_user = [];
            var az_user = [];
            var sri_user = [];
            var ru_user = [];
            var usa_user = [];
            var other_user = [];
            region['participants'].map(async (reg) => {
                if (reg.jid.startsWith('90')) { tr_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('994')) { az_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('91')) { hi_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('94')) { sri_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('7')) { ru_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('1')) { usa_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } 
            });
            var trus = ' ' + tr_user.length + '\n'
            var hius = ' ' + hi_user.length + '\n'
            var azus = ' ' + az_user.length + '\n'
            var srius = ' ' + sri_user.length + '\n'
            var ruus = ' ' + ru_user.length + '\n'
            var usaus = ' ' + usa_user.length + '\n'
            var oth = user_count - trus - hius - azus - srius - ruus - usaus
            const user_count_msg = ADMİN_USER + admin_count + USER_USER + user_count + TR_USER + trus + Hİ_USER + hius + AZ_USER + azus + SRİ_USER + srius + RU_USER + ruus + USA_USER + usaus + OTHER + ' ' + oth + '\n'
            const msg = `*Grup ID:* ${json.id} \n` + Lang.SUB + `${nwjson.subject} \n` + Lang.OWN + `${json.owner} \n` + Lang.COD + `${code} \n` + user_count_msg + Lang.DES + `\n\n${nwjson.desc}`
            var ppUrl = await message.client.getProfilePicture(message.jid) 
            const resim = await Axios.get(ppUrl, {responseType: 'arraybuffer'})
            await message.sendMessage(
                Buffer.from(resim.data), 
                MessageType.image, 
                {caption: msg }
            );
        }
        else {
            var status = await message.client.getStatus(message.jid) 
            var usppUrl = await message.client.getProfilePicture(message.jid) 
            var usexists = await message.client.isOnWhatsApp(message.jid)
            const nwmsg = Lang.JİD + `${usexists.jid} \n` + Lang.ST + `${status.status}`
            const resimnw = await Axios.get(usppUrl, {responseType: 'arraybuffer'})
            await message.sendMessage(
                Buffer.from(resimnw.data), 
                MessageType.image, 
                { caption: nwmsg }
            );
        }
    });
}
