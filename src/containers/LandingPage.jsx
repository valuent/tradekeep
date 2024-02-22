import React from "react";
import { motion, inView, animate, spring, delay } from "framer-motion";

function LandingPage() {
  const openRegister = () => {
    document.getElementById("regcontainer").style.top = "0%";
  };

  const dropAnimation = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const lineWidthIncreaseAnimation = {
    initial: {
      width: "5%",
      opacity: 0,
    },
    animate: {
      width: "80%",
      opacity: 1,
    },
  };

  return (
    <>
      <div className="overflow-hidden">
        <motion.div
          className="hero min-h-[50vh] overflow-visible bg-base-100"
          initial={{ y: -1000, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ delay: 0.3 }}
        >
          <div className="hero-content  overflow-visible text-center">
            <div className="max-w-xl overflow-visible">
              <motion.h1
                className="mb-8 overflow-visible text-5xl font-bold md:text-6xl lg:text-7xl"
                initial={{ y: -1000 }}
                animate={{
                  y: 0,
                }}
                transition={{ delay: 0.3 }}
              >
                TradeKeep.in
              </motion.h1>
              <motion.p
                className="text-md overflow-visible"
                initial={{ y: -1000 }}
                animate={{
                  y: 0,
                }}
                transition={{ delay: 0.4 }}
              >
                The most powerful and easy to use trading journal in the market.
              </motion.p>
              <motion.button
                className="btn mt-8 bg-primary hover:bg-secondary"
                initial={{ y: -1000 }}
                animate={{
                  y: 0,
                }}
                transition={{ delay: 0.5 }}
                onClick={openRegister}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="line m-auto h-0.5 w-4/5 rounded-lg bg-secondary"
          initial={{ width: "5%", display: "none" }}
          animate={{
            width: "80%",
            display: "block",
          }}
          transition={{ delay: 0.8 }}
        ></motion.div>
      </div>
      <motion.div
        className="title mt-10 overflow-visible text-center text-5xl font-bold"
        variants={dropAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Features
      </motion.div>
      <div className="featurecards mb-20 flex h-full w-full flex-wrap items-center justify-evenly pt-16">
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-body">
            <h2 className="card-title text-secondary">
              Save upto 10 Strategies
            </h2>
            <p>
              Track up to 10 strategies per account, optimizing your diverse
              trading approach. Analyze each strategy's performance with
              precision, empowering informed decisions for market success.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-body">
            <h2 className="card-title text-secondary">Save Trade-wise data</h2>
            <p>
              Track every trade precisely. Save up to 20 trades per strategy,
              200 trades daily per account. Gain invaluable insights for smarter
              trading decisions.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="card-body">
            <h2 className="card-title text-secondary">
              Organized overview table
            </h2>
            <p>
              Easily view your saved data for each strategy in a clear tabular
              format. Organize and analyze your trading activity with efficiency
              and precision, empowering informed decision-making.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <div className="card-body">
            <h2 className="card-title text-secondary">View, edit or delete</h2>
            <p>
              Never miss a detail: Easily review, edit, or delete any trade
              entry to ensure accuracy and precision.
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="line m-auto h-[1px] w-4/5 rounded-lg bg-neutral"
        variants={lineWidthIncreaseAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      ></motion.div>

      {/* Coming Soon */}
      <motion.div
        className="title mt-10 overflow-visible text-center text-5xl font-bold"
        variants={dropAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Stay tuned for...
      </motion.div>
      <div className="featurecards mb-20 flex h-full w-full flex-wrap items-center justify-evenly pt-16">
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-body">
            <h2 className="card-title text-accent">Performance Metrics</h2>
            <p>
              Detailed statistics such as gross P&L, net P&L, ROI, total
              brokerage, win-loss percentage and ratio, and trade expectancy,
              enhancing your trade analysis capabilities.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-body">
            <h2 className="card-title text-accent">Performance Charts</h2>
            <p>
              Easily visualize your trading performance with instantly generated
              charts and graphs based on your saved data, providing immediate
              insights for informed decision-making.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="card my-5 min-h-56 w-11/12 bg-base-200 shadow-xl sm:w-96"
          variants={dropAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-body">
            <h2 className="card-title text-accent">PnL grid</h2>
            <p>
              Gain insight into your trading performance over time with a
              comprehensive P&L grid, offering a clear overview of your profits
              and losses.
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="line m-auto h-[1px] w-4/5 rounded-lg bg-neutral"
        variants={lineWidthIncreaseAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      ></motion.div>
      <motion.div
        className="title mt-10 overflow-visible text-center text-5xl font-bold"
        variants={dropAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        Pricing!
      </motion.div>

      <motion.div
        className="mb-20 mt-5 overflow-visible p-3 text-center text-2xl"
        variants={dropAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        It's FREE till we roll-out some of the core features like Performance
        metrics
      </motion.div>
      
    </>
  );
}

export default LandingPage;
