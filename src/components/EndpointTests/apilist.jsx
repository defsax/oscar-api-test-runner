import { useCallback, useRef } from "react";
import ApiListItem from "./apilistitem";

export default function ApiList(props) {
  const { apis, server, expandCallback, testCallback } = props;

  // Create arrays of useRefs
  const testRefs = useRef([]);
  const expandRefs = useRef([]);

  // useCallback so that component doesn't reload on setCallback updating
  const setTestCallback = useCallback((callback) => {
    testRefs.current.push(callback);
  }, []);

  const setExpandCallback = useCallback((callback) => {
    expandRefs.current.push(callback);
  }, []);

  // Called when user presses expand button from index.jsx
  expandCallback((expanded) => {
    // Calls all registered expansion functions from apilistitem.jsx
    expandRefs.current.forEach((expand) => {
      expand(expanded);
    });
  });

  // Called when user presses test button from index.jsx
  testCallback(() => {
    // Calls all registered test functions from apilistitem.jsx
    testRefs.current.forEach((test) => {
      test();
    });
  });

  return (
    <div>
      {apis.map((api, i) => {
        return (
          <ApiListItem
            key={i}
            delay={i}
            api={api}
            expandCallBack={setExpandCallback}
            testCallBack={setTestCallback}
            server={server}
          />
        );
      })}
    </div>
  );
}