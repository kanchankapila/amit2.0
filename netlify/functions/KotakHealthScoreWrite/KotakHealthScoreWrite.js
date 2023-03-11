

const fetch = require('node-fetch')
const { MongoClient } = require('mongodb');
   const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);
  


   module.exports.handler = async function () {
    try {
      const response = await fetch("https://mtrade.kotaksecurities.com/TSTerminal/Fundamentals/MasterData/GetHealthScoreChartsData?companyId=&timePeriod=90", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "requestverificationtoken": "QQwX_S00KgE0V6qgX2eseJWqC7vvgV_qk6dM5em4Jmmx88ei2on4KmPvN-mmizMhmtYjXwbs5H25AMoqF7fgUXoGHV81:m384Wa3b9cBGtUfwNJrIaKWuzejIHSPk8K_OdThfSNgC8dZwoLv68Q7wHWSEueABnW912ee_M9GGcETgFo7gXiSlmJIkOfNd679AKpFu_dVwqtBhdbpWmq_QBJaLCsTxU0T9B2IcLgI1XDq1VQHc7IUqS0W8MwfkXpPwN3DXJ2U9DSZyoB-vA1JauI1h7XSY6kRxQD5tAxKBswhcHVv2FrCRm_5K5a1Sb348z1vtN3A_6Kdjajj_TscRuPBnStL0zkoqn__M0TuoaV3hLTVyfgw6m-hcgTkxQSpXoEwKj5ooyZtUZcryKLQMT5-XWJOEjIao84BxKdq6_HXnlRiJPLZpnwoO-3pe96j6XYGAXePPHxx9VxCqHyPfGZeZpF28FFRhEIvp0GOQrHBgADdGO9w7CDodJr0ctLObn-zmSa_suksX90C9iAhh2juE_bsVhLBazk30mAVTQi41ohQAlTvNADREgeoJkdUcrS50wamaEwTS0",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "_fbp=fb.1.1653745914138.1241231693; _ga=GA1.2.1340509370.1653745738; _gcl_au=1.1.873030795.1653745910; _nv_ab_ver_6941_3655=4515; _nv_did=253330646.1653745752.1585996377122177135239zqaz7; ORG36141=cab000d5-e326-4945-b583-d453ad82e69a; __stdf=0; _nv_uid=253330646.1653745752.46ba573e-2c31-47df-bc30-44347db76191.1656570370.1668322320.8.0; _nv_utm=253330646.1653745752.8.2.dXRtc3JjPWdvb2dsZXx1dG1jY249KG5vdCBzZXQpfHV0bWNtZD1vcmdhbmljfHV0bWN0cj0obm90IHByb3ZpZGVkKXx1dG1jY3Q9KG5vdCBzZXQpfGdjbGlkPShub3Qgc2V0KQ==; _nv_ab_cid=[\"4032\",\"3490\",\"2420\",\"3655\",\"5062\"]; _uetvid=53ce8fa0de8d11ec8991b5e9297a9184; _nv_hit=253330646.1668322320.cHZpZXc9MXxzdmlldz1bIjI0NDExIl0=; ASP.NET_SessionId=eqvcwgmsnei4h3wu0xfzpxsy; userTheme=; AppConnection=ZSGPW-e910f13a70c74e72b2e074b7df2ec946; _gid=GA1.2.1586470287.1670474336; __stp=eyJ2aXNpdCI6InJldHVybmluZyIsInV1aWQiOiJkMjZhN2Y5Yi03YjY4LTQ4OWItOTk4Ny1jNDZhNTQ5MTcxMmQiLCJjayI6IlpTR1BXIn0=; __stgeo=IjAi; __stbpnenable=MA==; _PLATFORMAUTH=2F846D92444DF7036B8902C2897807331A98EA379AABCAB68044BA522DC747F9E09151F5E8B2BD52376DEC2DC80CA8A09929CA795C68D34DACB17570FB20D856C48124E01E8DFBCE24F59CC62088B086C7822E52D3F15D712C4DFE940B5897F3CACACC123BE848AC88665D46A3CCEAE6674499583A401A0A34674885C252AAFF7FEBBAEB8C674F0AF8BBCF65CF49610B3505E6257A5250FE9D73433F23A5068161207DB9EBA058428708F4FF81965F33B359EBE355E63F5379A21375741A975482BC18B5B4EAD17F013DB63BFEA6CF91E459452665A72FE6B745A5B78977527853DF4F1891058F891809B6F23DC6392F4EF84E4324E72ABC80485A74161311C92E6639BC3E9D5CC59A77B7B15C6A22149704DE4E891DBADAC9B7C40FB89EDEB32B449011C07EBB2DA0807AA7F83BC7340A08582AA4295B124176C14E30077AAA8C91DB21F9E38AE43155575B4AE9E101CC0972FFB387AC0A166CE7FE5F889473D534D9DFF0A29DB9149AEC6659657497C67420D6C3B40FAD5ED4820385CD064DBF9DAE42A64F6BF730C8B8FC561F1F02447998B3084800D503FF0B524B39DB1EA2D75FAFF09B658DC623829E8DE07B1F3149282E3CF6F78FE5849DECD4DD1E31DB607A3B4FC0AD10C8342672A420C5758E64A1DA2749C72222C7A7D562691747AD1BD7A4F9003164162DBA3FE86A3F7AE2A7747A0D90D35595FB5992EB99661CB419837706AD8B7B9848A406FAADE5A0CB76DF7B3A2F38B2D08F047AFA8105EC5968304FBB7A5A6797B415CC5EA5A47311E55B7054797CF32A8A60F6B81667CDE1BD0515B0DFEAE90D2AEFE8378AD11AEAAC3F38DC4EE8AC148C305014B7BC1CF695B9BC73447B98B41AA8B5B938F878E34B811870F29743C557AB42ECE34D9CF051B5A7377411C2BD29CC589CD0C9D8B7C7BEFB987F8B5627E9060EC5BEF65EE598EC58; __sts=eyJzaWQiOjE2NzA0OTE0MDQ2MjUsInR4IjoxNjcwNDkxNDA0NjI1LCJ1cmwiOiJodHRwcyUzQSUyRiUyRm10cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tJTJGVFNUZXJtaW5hbCUyRlBsYXRmb3JtJTJGSGVhbHRoU2NvcmVTY2FubmVyJTJGRGFzaGJvYXJkIiwicGV0IjoxNjcwNDkxNDA0NjI1LCJzZXQiOjE2NzA0OTE0MDQ2MjV9; _gat_UA-10523021-12=1",
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
      const data = await response.json(response.body.data)
     
      process.env.data3 = (JSON.stringify(data)).replace("[", "").replace("]", "");
      await client.db('KotakHealthScore').collection("KotakHealthScore").deleteMany(); 
      await client.db('KotakHealthScore').collection("KotakHealthScore").insertOne(data[i]) 
     for (i in data){
     
       await client.db('KotakHealthScore').collection("KotakHealthScore").insertOne(data[i]) 
    } 
      
       
      
           await client.close()
       
  
      return {
        statusCode: 200,
        body:process.env.data3,
        
       
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
  