module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors:{
      'transparent':'transparent',
      'mint':'#F4FFF8',
      'black':'#252323',
      'green':'#00B295',
      'red':'#D33F49',
      'blue':'#1C7293',
      'gold':"#FFD700",
      'listing-dark':'#092A37',
      'listing-light':'#0D3D50',

      'gray':"#6b7280"
    },
    fontFamily:{
      'sans':'Poppins'
    },
    extend: {
    },
    variants: {
      extend: {
        visibility: ["group-hover"],
      },
     },
  },
  plugins: [],
};