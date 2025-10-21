
import prisma from '../../lib/prisma'
export default async function handler(req, res){
  if(req.method === 'GET'){
    const products = await prisma.product.findMany();
    res.json(products);
  } else if(req.method === 'POST'){
    const { name, price, cost, barcode } = req.body;
    const product = await prisma.product.create({ data: { name, price: Number(price), cost: Number(cost), barcode } });
    res.json(product);
  } else res.status(405).end();
}
