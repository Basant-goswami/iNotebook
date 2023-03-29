import React from 'react'

const About = () => {
  return (
    <>
      <div className='container aboutContainer'>
        <div className="row row-cols-1 bothBox">
          <div className="col rounded-top" style={{ height: '160px', backgroundColor: '#c8d5ea' }}></div>

          <div className="col d-flex align-items-center justify-content-center rounded-bottom" style={{ height: '340px', backgroundColor: '#34568b', color: 'white' }}>
            <div className='aboutPara mx-4 text-center overflow-auto'> <h3 className='mx-4'>BASANT KUMAR BHARATI</h3> A digital notebook app that provides optimized Writing & Reading experience.We bring aesthetics into digital notebooks.
             <br></br> It's awesome for novels, stories, notes, diaries, journals.Now you can read and share your writings like an eBook!. You can have several iNotebooks on your shelves, besides storing them digitally.
            </div>
            <div className='secondBox text-center mx-2'>
              Follow on :
              <a href='https://www.instagram.com/basant.bharati.54/' rel="noreferrer" target={'_blank'}><i className="fa-brands fa-instagram mx-2"></i> </a>
              <a href='https://www.facebook.com/basant.bharati.54/' rel="noreferrer" target={'_blank'}><i className="fa-brands fa-facebook"></i> </a>
              <a href='/' rel="noreferrer" target={'_blank'}><i className="fa-brands fa-twitter"></i> </a>
              <a href='mailto: basantgoswami7050@gmail.com' rel="noreferrer" target={'_blank'}><i className="fa-solid fa-envelope"></i> </a>
              <a href='https://www.linkedin.com/in/basant-kumar-bharati-7389a7246' rel="noreferrer" target={'_blank'}><i className="fa-brands fa-linkedin"></i> </a>
              <a href='https://github.com/Basant-goswami' rel="noreferrer" target={'_blank'}><i className="fa-brands fa-github"></i> </a>
              <div className='text-center'>© Copywrite | All Rights Reserved</div>
            </div>
          </div>
          <img className='img-fluid rounded-circle aboutImg' alt='basantpic' src={require("../image/aboutB.jpg")} />
        </div>
      </div>
    </>
  )
}

export default About
