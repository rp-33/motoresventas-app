import silver from '../assets/images/subscription-silver-background.png'
import gold from '../assets/images/subscription-gold-background.png'

export const subscriptions = {
    silver: {
        name: 'Básico',
        price: 15,
        duration: ['mensual', 'mes'],
        benefits: ['Lorem ipsum silver', 'Lorem ipsum silver', 'Lorem ipsum silver'],
        background: silver
    },
    gold: {
        name: 'Premiun',
        price: 150,
        duration: ['anual', 'año'],
        benefits: ['Lorem ipsum gold', 'Lorem ipsum gold', 'Lorem ipsum gold'],
        background: gold
    }
}

export const BASICO = { label: 'BÁSICO', value: 'silver', duration: 30, price: 15 };
export const PREMIUN = { label: 'PREMIUN', value: 'gold', duration: 360, price: 150 };