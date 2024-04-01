'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = 'd2b583ed37648f394931da4a75f4edb1'

const mainnet = {
    chainId: 137,
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com/',
    rpcUrl: 'https://polygon-rpc.com/'
}

const metadata = {
    name: 'MusicDex',
    description: 'Invest in Music Royalties and Shape the Future of Music',
    url: 'https://musicdex.co/',
    icons: ['https://musicdex.co/favicon.ico']
}

const ethersConfig = defaultConfig({
    metadata,
})

createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

interface Web3ModalProps {
    children: React.ReactNode
}

export function Web3Modal({ children }: Web3ModalProps) {
    return children
}