interface ISlideProps {
  index: number;
}
export const Slide = ({
  index,
}: ISlideProps) => (
  <div
    className="sign-up-image"
    style={{
      background: `url(/assets/slide-${index + 1}.jpeg) no-repeat center/cover`,
    }}
  />
);

export default Slide;
