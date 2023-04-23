

const fetch = require('node-fetch')
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);
  


   module.exports.handler = async function () {
    try {
      await client.connect()
      const response = await fetch("https://mtrade.kotaksecurities.com/TSTerminal/Fundamentals/MasterData/GetHealthScoreChartsData?companyId=&timePeriod=90", {
        "headers": {
          
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "requestverificationtoken": "PlkWVX8a2irx7qjbkMpdFV38kx9S99mHQPuwAWcV-6cHqPy_MaY-f5Pm4m3EQeDKIEds8YKP62ptWvmUfAdJw3guDiQ1:bPAoznHZ_O8eyIasVweHopmoi32u_j_-qL0OmNbpVrGDTw2dHg1pf6jeyk5JwExkWYxAB9CylPH0Xx0JOSyMQieDaZxgJH_UHNh_kn0-5RSTkATMAZLnSFZHeRgwk2lv0D7_XHzg6ujKWVlOAw8F1OpMqKH0QyEQsJjcaxtInZaupmWwhlxlNe_JLJSZR06-t3gRhbaYvO4HVpKczBEWaeFAqjYWL9G9fE-QxrWq5Jl5ywmsqCgLopsHbloCGwAnp6wpOk3leU9dzLBlW9OUlLTsyI4_2pB9CCaWFPlLsRlAKCl_Gg6LvEIJtglwmYzWX2qKFmgYv_6vP3GfTLXpanBmOYjUX5JsUrXNPBGUAVXsJTyJ-4-9I_-7JQ-UH31BuwjnzXF0hHHHbtbmQdndCKciMH-dJjGa2F00QgIJlNH4cUOwNVZ0WPpiT2KQHNCo7qDtBkFvCOeB5GjCoVdVOsj_ijlFwjqfeHGVCaDiXy3x_uw70",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_nv_ab_cid=[\"5275\",\"5279\"]; _ga=GA1.2.browser; _nv_uid=253330646.1678636554.abeca50f-64b6-40a2-8ad0-3d0174d5f6af.1678636554.1678636554.1.0; _nv_utm=253330646.1678636554.1.1.dXRtc3JjPW50cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tfHV0bWNjbj0obm90IHNldCl8dXRtY21kPXJlZmVycmFsfHV0bWN0cj0obm90IHByb3ZpZGVkKXx1dG1jY3Q9L3xnY2xpZD0obm90IHNldCk=; _nv_did=253330646.1678636554.12216168224wvavv; _nv_hit=253330646.1678636554.cHZpZXc9MXxzdmlldz1bIjI1NDQ3IiwiMjU0NDgiXQ==; _ga_KJMR86BC9J=GS1.1.1678707989.3.1.1678707990.59.0.0; ASP.NET_SessionId=a0z1yqvmilzozrux1lcp1os4; _PLATFORMAUTH=0E26C9C6DCE28565CD84CD78364CA3643F34FC73C8F1A3A1CE3CF279DCDEFE86A64B7BF3F27A40FDDCB49ECBB12387651E9240DA75B426B19CAAFDE8F93D294EEA4194C5C01A586AF2FA04DB977E2F0BC71072B8F62FA4F36A3256E7FDF4A3F93837A49B035DF8FB53C28E1426AFAA76D6006F09C1AAEA86EB4DB4D00FACFBC687305CB93AD8EB2A29E99AB29D4E975658EF2ECD7F617DE0B7915AAA15D8DBAF22516442677C1170CD8B794459E8875BE12AF990BE4F729896B1065B01EDCEC7685C563947A2604C6024DDA19D6D8A5C0127276D3F260FB9F43540914405D2509660DB2F6D07DF04DF6E889D1C2B6900B336BBDC53E0F1AD6BBA4258BDEE0B1EB5B4DFDC0B7867DDAA40E9B6BA7FA345F68F92E4BA82C077FC8F02065718A7D917BA821D47C524E34946EF752DE1AD9D34287DEF9A2463BC3E39CD7FFE4FB133C5B9731F9324FC176B7CBC0F88F82DF15317017CA50DE2455E2663936AAB4CB7CCE024423C2C47B10747D12133DA18E1722EAE1AF00A6E56C4D8A03A00A69A9F07D1EB38156F5CF0729E8BD2CEBF76458171C460FBAFCE407E0137465E0BDCFB12053106AB88068D27BE8388805514CB3D24994CBA1D03B4C61A8491ADDDB400098C6641FCF0EDCA2D47962720EC2BEA436CBEB9BF9E042F0FC23CC2821217174D2D298819FDFD3C232BEB169AF7D7EA49B66665E8D883E6EC9FEB95C69ED2E10D8537D165DD0DCA947D524A5F8860375C3FC047557C729637D3037273691576FDDC89C4F8485E4DE4189DBC0D502EF0F8CD2DF984AD2BEA76024150324D78C70BCC1ACBB91AE506CF5ACE4A11A881BAB5E8B9469104134B1EF86997FF3B7294F4CA40E15EBC1C1FFD99BA2660FE03B7AB67C637A488E0CD60EE367F936F2D0BF342EF63C4C42A34AD3257D6AA53DE2241522AF5D148AE8FA2F04A4217DC551A6AC32FA5; userTheme=; AppConnection=ZSGPW-3297e75e8c3b4a1090bd6c5aa24c6c89; _gid=GA1.2.185690042.1678961080; __stp=eyJ2aXNpdCI6Im5ldyIsInV1aWQiOiJmYzdlZWQ0ZS0yZGVhLTQ0YWUtYTk4ZS1mNTU5ODViNzI3NzAiLCJjayI6IlpTR1BXIn0=; __stgeo=IjAi; __stbpnenable=MA==; __stdf=MA==; user=eqFMLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEVGMUY3QUM2AAAAAAAAAAC86RJkAAAAAEaFFwCnzYlPcKDe6GEreUd0NStwvwq6vwAAAAAAAAAAAAAAAHcAAAAVVDAUAAAAAA==; _gat_UA-10523021-12=1; __sts=eyJzaWQiOjE2Nzg5NjEwODEwNTgsInR4IjoxNjc4OTYxNDM1NzQ4LCJ1cmwiOiJodHRwcyUzQSUyRiUyRm10cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tJTJGVFNUZXJtaW5hbCUyRlBsYXRmb3JtJTJGSGVhbHRoU2NvcmVTY2FubmVyJTJGRGFzaGJvYXJkIiwicGV0IjoxNjc4OTYxNDM1NzQ4LCJzZXQiOjE2Nzg5NjEwODEwNTgsInBVcmwiOiJodHRwcyUzQSUyRiUyRm10cmFkZS5rb3Rha3NlY3VyaXRpZXMuY29tJTJGVFNUZXJtaW5hbCUyRlJlYWxUaW1lJTJGV2F0Y2hMaXN0JTJGU1JXYXRjaExpc3QiLCJwUGV0IjoxNjc4OTYxMDgxMDU4LCJwVHgiOjE2Nzg5NjEwODEwNTh9",
  
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
    }finally{
      await client.close()
    }
  }
  