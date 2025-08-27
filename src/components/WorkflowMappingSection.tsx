import React from 'react';
const StoryImage = '/images/Story-removebg-preview.png';

const WorkflowMappingSection: React.FC = () => {
  return (
    <section className="CalloutSection_section___KRUc">
      <div className="CalloutSection_container__evjvR">
        <div className="CalloutSection_callout_container__A2Wzj">
          <div className="CalloutSection_content__6LL3k">
            <h2 className="CalloutSection_title__7dfAl FeaturesSection_heading_2__z9mcA">
              We map the chaos
            </h2>
            <p className="CalloutSection_description__MS245 FeaturesSection_body__S4iJv">
              Our AI makes sense of your complex workflow so you don't have to. We turn that chaos into a simple prompt with the right updates, ready for your final say.
            </p>
          </div>
          <div className="CalloutSection_graphic__DaHKB">
            <div
              style={{
                background: 'white',
                borderRadius: '0px',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <img
                src={StoryImage}
                alt="Review, Approve, Done - workflow approval process"
                className="content-image-mobile"
                style={{
                  maxWidth: '100%',
                  maxHeight: '320px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowMappingSection;