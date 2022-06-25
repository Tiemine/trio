import {defineStore} from 'pinia'

export const updateOptionsStore = defineStore('updateOptions', {
    state: () => {
        return {
            mailChimpLabels: {},
            gmailLabels: {}
        }
    }
})