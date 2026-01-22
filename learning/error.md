## Error Type
Console Error

## Error Message
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <HotReload globalError={[...]} webSocket={WebSocket} staticIndicatorState={{pathname:null, ...}}>
      <AppDevOverlayErrorBoundary globalError={[...]}>
        <ReplaySsrOnlyErrors>
        <DevRootHTTPAccessFallbackBoundary>
          <HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
            <HTTPAccessFallbackErrorBoundary pathname="/login" notFound={<NotAllowedRootHTTPFallbackError>} ...>
              <RedirectBoundary>
                <RedirectErrorBoundary router={{...}}>
                  <Head headCacheNode={{rsc:<Fragment>, ...}}>
                    <__next_viewport_boundary__>
                    <MetadataWrapper>
                      <div
                        hidden={true}
-                       bis_skin_checked="1"
                      >
                    ...
                  <__next_root_layout_boundary__>
                    <SegmentViewNode type="layout" pagePath="/Desktop/c...">
                      <SegmentTrieNode>
                      <link>
                      <script>
                      <script>
                      <RootLayout>
                        <html lang="en">
                          <body
                            className="geistsans_d025f23b-module__QpWalG__variable geistmono_df95d851-module__oUZ5Cq__..."
-                           __processed_e2aedac9-1194-4289-9ee9-18c3005aea2f__="true"
-                           bis_register="W3sibWFzdGVyIjp0cnVlLCJleHRlbnNpb25JZCI6ImVwcGlvY2VtaG1ubGJoanBsY2drb2ZjaWll..."
                          >
                            <Navbar>
                              <nav className="w-full bg-...">
                                <div
                                  className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
-                                 bis_skin_checked="1"
                                >
                                  <LinkComponent>
                                  <div
                                    className="flex items-center gap-6 text-sm font-medium"
-                                   bis_skin_checked="1"
                                  >
                            ...
                              <SegmentViewNode type="page" pagePath="/Desktop/c...">
                                <SegmentTrieNode>
                                <ClientPageRoot Component={function LoginPage} serverProvidedParams={{...}}>
                                  <LoginPage params={Promise} searchParams={Promise}>
                                    <div
                                      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-..."
-                                     bis_skin_checked="1"
                                    >
                                      <div
                                        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
-                                       bis_skin_checked="1"
                                      >
                                        <h1>
                                        <p>
                                        <form onSubmit={function onSubmitHandler} className="space-y-5">
                                          <div
-                                           bis_skin_checked="1"
                                          >
                                          <div
-                                           bis_skin_checked="1"
                                          >
                                          ...
                                        ...
                            <Footer>
                              <footer className="w-full bg-...">
                                <div
                                  className="max-w-7xl m-auto px-6 py-6 flex flex-col md:flex-row items-center justify..."
-                                 bis_skin_checked="1"
                                >
                                  <p>
                                  <div
                                    className="flex gap-4 mt-2 md:mt-0"
-                                   bis_skin_checked="1"
                                  >
                  ...



    at div (<anonymous>:null:null)

Next.js version: 16.1.0 (Turbopack)
