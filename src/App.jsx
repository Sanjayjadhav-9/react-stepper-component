import CheckoutStepper from "./components/CheckoutStepper";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => (
      <div className="text-center mb-4">Provide your contact details.</div>
    ),
  },
  {
    name: "Shipping Info",
    Component: () => (
      <div className="text-center mb-4">Enter your shipping address.</div>
    ),
  },
  {
    name: "Payment",
    Component: () => (
      <div className="text-center mb-4">Complete payment for your order.</div>
    ),
  },
  {
    name: "Delivered",
    Component: () => (
      <div className="text-center mb-4">Your order has been delivered.</div>
    ),
  },
];

function App() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center">
        <h2 className="text-center font-bold text-3xl mb-4">Checkout</h2>
        <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
      </div>
    </>
  );
}

export default App;
