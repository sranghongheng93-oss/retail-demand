export type Method = 'Moving Average' | 'Weighted Moving Average' | 'Exponential Smoothing' | 'Seasonal Naive' | 'Holt Trend' | 'Naive';
export type SKU = { sku:string; name:string; category:string; brand:string; pattern:string; price:number; history:number[]; promoLift:number; status:string };
export const methods: Method[] = ['Moving Average','Weighted Moving Average','Exponential Smoothing','Seasonal Naive','Holt Trend','Naive'];
export function forecast(history:number[], method:Method, horizon=12):number[] {
  if (!history.length) return Array(horizon).fill(0);
  const n=history.length, avg=(a:number[])=>a.reduce((s,v)=>s+v,0)/(a.length||1);
  let out:number[]=[];
  if(method==='Moving Average') { const v=avg(history.slice(-8)); out=Array(horizon).fill(v); }
  else if(method==='Weighted Moving Average') { const a=history.slice(-4), w=[1,2,3,4].slice(4-a.length); const d=w.reduce((s,v)=>s+v,0)||1; const v=a.reduce((s,x,i)=>s+x*w[i],0)/d; out=Array(horizon).fill(v); }
  else if(method==='Exponential Smoothing') { let level=history[0]; for(const x of history.slice(1)) level=.35*x+.65*level; out=Array(horizon).fill(level); }
  else if(method==='Seasonal Naive') { out=Array.from({length:horizon},(_,i)=>history[Math.max(0,n-52+(i%52))] ?? history[n-1]); }
  else if(method==='Holt Trend') { let level=history[0], trend=history.length>1?history[1]-history[0]:0; for(const x of history.slice(1)){const prev=level;level=.35*x+.65*(level+trend);trend=.2*(level-prev)+.8*trend;} out=Array.from({length:horizon},(_,i)=>Math.max(0,level+(i+1)*trend)); }
  else out=Array(horizon).fill(history[n-1]);
  return out.map(v=>Math.max(0,Math.round(v)));
}
export function makeMockSKUs():SKU[] {
 const cats=['Beverages','Snacks','Personal Care','Home Care','Packaged Food','Baby Care','Health & Wellness','Pet Care','Dairy','Instant Food'];
 const patterns=['Stable','Seasonal','Trending','Intermittent','Promotional','Declining'];
 const brands=['Northstar','DailyGood','Freshline','Mellow','BrightCo'];
 return Array.from({length:150},(_,i)=>{const pattern=patterns[i%patterns.length], base=80+(i*37%420), history:number[]=[]; let seed=i+73; const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280}; for(let t=0;t<156;t++){let season=pattern==='Seasonal'?1+.38*Math.sin((t%52)/52*Math.PI*2):1;let trend=pattern==='Trending'?1+t*.002:pattern==='Declining'?Math.max(.45,1-t*.003):1;let val=base*season*trend*(.78+rnd()*.44);if(pattern==='Intermittent'&&rnd()<.52)val=0;if(pattern==='Promotional'&&t%13===0)val*=1.8;history.push(Math.round(val));}return {sku:`SKU-${String(i+1).padStart(4,'0')}`,name:[ 'Sparkling Water','Potato Crisps','Daily Shampoo','Laundry Liquid','Instant Noodles','Baby Wipes','Vitamin C','Pet Treats','UHT Milk','Rice Crackers'][i%10]+` ${['Classic','Family Pack','Value','Premium','Mini'][Math.floor(i/10)%5]}`,category:cats[i%cats.length],brand:brands[i%brands.length],pattern,price:1.2+(i%18)*.65,history,promoLift:15+(i*7%55),status:i%23===0?'New':i%31===0?'Declining':'Active'};});
}
export function wmape(actual:number[],pred:number[]){const den=actual.reduce((s,v)=>s+v,0);return den?actual.reduce((s,v,i)=>s+Math.abs(v-(pred[i]??0)),0)/den*100:0;}
export function bias(actual:number[],pred:number[]){const den=actual.reduce((s,v)=>s+v,0);return den?pred.reduce((s,v,i)=>s+v-(actual[i]??0),0)/den*100:0;}
