import { HOW_IT_WORKS_STEPS } from './HowItWorks.constants';
import { howItWorksStyles as s } from './HowItWorks.styles';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className={s.section.wrapper}>
      <div className={s.section.glow} />

      <div className={s.section.container}>
        {/* Header */}
        <div className={s.header.wrapper}>
          <div className={s.header.badge}>
            <span className={s.header.badgeDot} />
            Seamless Experience
          </div>

          <h2 className={s.header.heading}>
            HOW IT <span className={s.header.gradient}>WORKS</span>
          </h2>

          <p className={s.header.subtitle}>
            Professional detailing delivered to your location in four simple steps.
          </p>
        </div>

        {/* Flow */}
        <div className={s.flow.wrapper}>
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = s.icons[step.iconKey].component;
            const gradient = s.gradients[step.gradient];

            return (
              <div key={step.id} className={s.card.wrapper}>
                <div className={s.card.inner}>
                  <div className={s.card.gloss} />

                  <div className={s.card.iconWrap}>
                    <div className={`${s.card.iconFrame} ${gradient}`}>
                      <div className={s.card.iconInner}>
                        <Icon className={s.icons[step.iconKey].className} />
                        {step.isLive && <div className={s.card.liveGlow} />}
                      </div>
                    </div>
                    <div className={s.card.stepBadge}>{index + 1}</div>
                  </div>

                  <h3 className={s.card.title}>{step.title}</h3>
                  <p className={s.card.desc}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
