/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"LC2xxZwFo8YZmvmo1FEOvkK0r8hK2zTb"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"kSE7NiKMMsah2cTVQ2QGnaRinLPfmMp0"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"2htjyqaU0tp37ttQkK2AmZJaHt3AKzzU"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"dohl4S4bUTl8Qf2JjiEto7WQfVKDa7E5"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"cXlcybefXUe2xmPja76JKzf8ho10B7iH"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"JbAW4XeogbsGCxejbWUFQbf5Y899EW36"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
