const arr1 = [0, 1, 2, 3, 4, 5];
const arr2 = [0, 1, 2, 3, 4, 5];

function Item({ arrayId, children }) {
  return (
    <div id={arrayId}>
      ok{arrayId}
      {children}
    </div>
  );
}

function SignUp() {
  return (
    <div>
      {arr1.map((v) => (
        <Item arrayId={v} key={v}>
          {arr2.map((value) => (
            <Item arrayId={`${v}.${value}`} key={`${v}.${value}`} />
          ))}
        </Item>
      ))}
    </div>
  );
}

export default SignUp;
