import { NextRequest, NextResponse } from 'next/server';

export async function GET(requst: NextRequest) {
  let randomNumber: number = getRandomInt(1, 1000);

  const response = await fetch(
    `https://api.jikan.moe/v4/manga/${randomNumber}`
  )

  const data = await response.json();

  console.log(data);
  
  return NextResponse.json(data);
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max))
}