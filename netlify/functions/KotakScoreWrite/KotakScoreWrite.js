

const fetch = require('node-fetch')
const { MongoClient } = require('mongodb');
   const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);
  


   module.exports.handler = async function () {
    try {
      const response = await fetch("https://mtrade.kotaksecurities.com/TSTerminal/Fundamentals/MasterData/GetHealthScoreScreenerData?sectorId=-1&marketCap=ALL&healthScoreValue=A&defaultView=true", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "requestverificationtoken": "5LuPMPMxSDXk0DTHG3r9LWmO6YeygBOB80wimUHk-8xmabhjgiTZCV5Mft1ipm3_dxymkSGQwHBnxq4FZJYp7PuPmDc1:lMUF0kEhbUVXM1lfX5ixTujusdb8T41_XRpbnKqwLEhkL1z0QNqR97WZuLhxc1nIO5Ph0j7DpPnwk6UgqA2gW_tjvtpisBTJbL0B1ZizvJKx_VUstY6Dpx_Smn4Flfcz3__gsLI7ObHLJYqWIZRlVCkhSc1G6p3MXWpoxL0TiMYBPiw_-cL6VOUxvn9XOOoCfKcc36IYKL6S16iq4q4xRV83cibPjJEYdEMpJ9BrjBW_7s5N8t788a_FSRb-Hr7tjvHXU8U0_k6zbv2PQFG0IW1LTCF_AJV_-Kecr10kyzJpDQla5fauvXuQjlBZQvXMAm2wP7IqjtyXBumy862SLRcFKHO-MVuQn010no6RbrMs_zhXz10Bk1YH3WMLF_JtFfJYXknWJ8LjVm8fPWXgrsijAaXtxdtdMtqPqBwuQNj6LooH_VU5367M4WD12w5i2JhH-CFI5HjxhNX0i_9k_TSIr5ByYU4IrFanZUT0O27Yl4RQ0",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "_nv_did=253330646.1663063816.14911128128x0swc; _gcl_au=1.1.1639627158.1663064724; ORG36141=5b87ac45-2ded-4461-8f31-cc653a3fb592; _nv_ab_cid=[\"5062\",\"5275\",\"5279\"]; _fbp=fb.1.1670188060801.1677205677; _ga_KJMR86BC9J=GS1.1.1670195272.8.0.1670195272.60.0.0; __stp=eyJ2aXNpdCI6InJldHVybmluZyIsInV1aWQiOiJhMzJhY2Y1YS02OWQxLTQ4YzItOWRhMC0zN2ZkYTk0OTIxZGMiLCJjayI6IlpTR1BXIn0=; __stdf=MA==; ASP.NET_SessionId=xdfxiuptmbytxbev2jfmznhp; betapopupflag=0; Ksec_source=; Ksec_medium=referral; _nv_ab_ver_6941_5275=6397; _nv_ab_ver_6941_5279=6401; MXCookie=MXCookie; _nv_ab_app_6941_5275=1; _nv_ab_app_6941_5279=1; userTheme=; _nv_ttsOnpage_6941={\"d\":0,\"h\":18,\"m\":43,\"s\":16,\"ms\":559}; _nv_sess=253330646.1670576623.zkR5GkkygwjkKG8ouxTMxrw7O9RakVQLrdbeU4CO0rZ0cWcBU6; _nv_uid=253330646.1663063816.30136b28-b11a-462c-ab83-d5331cf6f627.1670429465.1670576623.4.0; _nv_utm=253330646.1663063816.4.1.dXRtc3JjPW50cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tfHV0bWNjbj0obm90IHNldCl8dXRtY21kPXJlZmVycmFsfHV0bWN0cj0obm90IHByb3ZpZGVkKXx1dG1jY3Q9L3xnY2xpZD0obm90IHNldCk=; _nv_hit=253330646.1670576623.cHZpZXc9MQ==; _nv_banner_ab_24408=24408; _gid=GA1.2.373931398.1670576624; _ga_YYK0MMSNME=GS1.1.1670576626.4.0.1670576626.0.0.0; _uetsid=63be3da077a011ed80288503f1c42625; _uetvid=615261e0334e11edbb4afb1d5435107a; _PLATFORMAUTH=D295A7E230B1BBB7A95E23F012CDA56DB1380B81BAC77DF99CF27846E3F037CA096B3E4C122E91ED66DE2A84DBC63809A678161A5316694F95DADB2C9157745F8736F1EF0015E3B194620F687A60432BC83161673F140BAF9F563A30C56B37ADB48EBECF5FC79BF9A220BA841E6A61E98665EB6EB1A1A48E2A733EB7D234C8FB8E9BAEB190A0CE7813F83FF2D3AB1686FC4C56F2F287EE656B8936B3D1A62808E643680B619610C12BD7D8EE5951FAC6D76053F526FE8A1A78EB7A3B463914EA8D35101CFC00DAB2901949FA8911774BA8859B082A0F612826C820ACF170EB439144B6932ACEC2F77F07B2F2DC5B8604FD08E63A5E759E5F09B6080DF0297517DCABE8145A3B4A013FFCD45CE46B5E45A82E0BCF8B39C098C79AD0D8D6CB8918AB1D1C315074C442740BF6E0C6D9F9F45567D76951EEA077447CC3B1351C5675937C11B066E598D07FA73013669CEE03FA5A13D5DBAEA58E01E44DCEB403075F926DCF62E177F2C91D661C2A68ED64D666AA2AA13D77C1AFAFE65D60E2F73F3F337D5AC88535321377F6BE654725EF02B608F4C743AB8ADAB4EBD95F94664DB58EF9F4F82D2CE5067DC6839E67717F972B727F048144276F719F282286204E712E07F23D9F6102501F9AD63598F60E41C43D2AB52700BFEF1B5F85B1F82BC67196D61704980B4818CC798FFE1C5E15346AB05DA4325FDDC427DAD5728C204C8BA79507260FAC8B8DCE810EE9DF9734A87169D72EFCC02FED845D04AC9FDF64B52C5342CB577BB25B95433DF8448B83C953E28CF128B1477972C7A6D82EF8659A9582F5333C3E2CC7CDBDB45DBFEE5FD94910252598A8D18533B45649B7955BDB75396C211FD8ECA38CE99E9F004FA71A11568A4CB7DE5A427AB21A55DDF4DC66E9EE57E7F0603079B616331B2A9128A496723184E72029B517F0664CB0FB3C959FFAF7FB; AppConnection=ZSGPW-6f9afc0d1d92493fac82e15f0e23326d; _ga=GA1.2.browser; _gat_UA-10523021-12=1; __stgeo=IjAi; __stbpnenable=MA==; __sts=eyJzaWQiOjE2NzA1NzY3MDY0MDUsInR4IjoxNjcwNTc2NzI3NjA0LCJ1cmwiOiJodHRwcyUzQSUyRiUyRm10cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tJTJGVFNUZXJtaW5hbCUyRlBsYXRmb3JtJTJGSGVhbHRoU2NvcmVTY2FubmVyJTJGRGFzaGJvYXJkIiwicGV0IjoxNjcwNTc2NzI3NjA0LCJzZXQiOjE2NzA1NzY3MDY0MDUsInBVcmwiOiJodHRwcyUzQSUyRiUyRm10cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tJTJGVFNUZXJtaW5hbCUyRlJlYWxUaW1lJTJGV2F0Y2hMaXN0JTJGU1JXYXRjaExpc3QiLCJwUGV0IjoxNjcwNTc2NzA2NDA1LCJwVHgiOjE2NzA1NzY3MDY0MDV9",
          "Referer": "https://mtrade.kotaksecurities.com/TSTerminal/Platform/HealthScoreScanner/Dashboard",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
      
      
      if (!response.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: response.status, body: response.statusText }
      }
      const data = await response.json(response.body)
     
      // process.env.data1 = (JSON.stringify(data)).replace("[", "").replace("]", "");
      await client.db('KotakScore').collection("KotakScore").deleteMany(); 
      // await client.db('KotakScore').collection("KotakScore").insertOne(data[i]) 
     for (i in data){
     
       await client.db('KotakScore').collection("KotakScore").insertOne(data[i]) 
    } 
      
       
      
           await client.close()
       
  
      return {
        statusCode: 200,
        body:process.env.data1,
        
       
      }  

   
    } catch (error) {
      // output to netlify function log
      console.log(error)
      return {
        statusCode: 500,
        // Could be a custom message or object i.e. JSON.stringify(err)
        body: JSON.stringify({ msg: error.message }),
      }
    }
  }
  