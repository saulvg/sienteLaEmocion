export const ExperienceDetail = ({ description, experienceImg }) => {
  return (
    <div className='experience-detail' data-aos='flip-left'>
      <img src={experienceImg} alt='logo' width={'180px'} />
      <h3>{description}</h3>
    </div>
  );
};
