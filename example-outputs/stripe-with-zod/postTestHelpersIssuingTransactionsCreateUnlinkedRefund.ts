import {
  z_Issuing_Transaction,
  z_Error,
  Issuing_Transaction,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const postTestHelpersIssuingTransactionsCreateUnlinkedRefundEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/transactions/create_unlinked_refund',
    method: 'post',
    supportedSecuritySchemas: [],
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          amount: z.number().int().safe().finite(),
          card: z.string(),
          currency: z.string().optional(),
          expand: z.array(z.string()).optional(),
          merchant_data: z
            .object({
              category: z
                .enum([
                  'ac_refrigeration_repair',
                  'accounting_bookkeeping_services',
                  'advertising_services',
                  'agricultural_cooperative',
                  'airlines_air_carriers',
                  'airports_flying_fields',
                  'ambulance_services',
                  'amusement_parks_carnivals',
                  'antique_reproductions',
                  'antique_shops',
                  'aquariums',
                  'architectural_surveying_services',
                  'art_dealers_and_galleries',
                  'artists_supply_and_craft_shops',
                  'auto_and_home_supply_stores',
                  'auto_body_repair_shops',
                  'auto_paint_shops',
                  'auto_service_shops',
                  'automated_cash_disburse',
                  'automated_fuel_dispensers',
                  'automobile_associations',
                  'automotive_parts_and_accessories_stores',
                  'automotive_tire_stores',
                  'bail_and_bond_payments',
                  'bakeries',
                  'bands_orchestras',
                  'barber_and_beauty_shops',
                  'betting_casino_gambling',
                  'bicycle_shops',
                  'billiard_pool_establishments',
                  'boat_dealers',
                  'boat_rentals_and_leases',
                  'book_stores',
                  'books_periodicals_and_newspapers',
                  'bowling_alleys',
                  'bus_lines',
                  'business_secretarial_schools',
                  'buying_shopping_services',
                  'cable_satellite_and_other_pay_television_and_radio',
                  'camera_and_photographic_supply_stores',
                  'candy_nut_and_confectionery_stores',
                  'car_and_truck_dealers_new_used',
                  'car_and_truck_dealers_used_only',
                  'car_rental_agencies',
                  'car_washes',
                  'carpentry_services',
                  'carpet_upholstery_cleaning',
                  'caterers',
                  'charitable_and_social_service_organizations_fundraising',
                  'chemicals_and_allied_products',
                  'child_care_services',
                  'childrens_and_infants_wear_stores',
                  'chiropodists_podiatrists',
                  'chiropractors',
                  'cigar_stores_and_stands',
                  'civic_social_fraternal_associations',
                  'cleaning_and_maintenance',
                  'clothing_rental',
                  'colleges_universities',
                  'commercial_equipment',
                  'commercial_footwear',
                  'commercial_photography_art_and_graphics',
                  'commuter_transport_and_ferries',
                  'computer_network_services',
                  'computer_programming',
                  'computer_repair',
                  'computer_software_stores',
                  'computers_peripherals_and_software',
                  'concrete_work_services',
                  'construction_materials',
                  'consulting_public_relations',
                  'correspondence_schools',
                  'cosmetic_stores',
                  'counseling_services',
                  'country_clubs',
                  'courier_services',
                  'court_costs',
                  'credit_reporting_agencies',
                  'cruise_lines',
                  'dairy_products_stores',
                  'dance_hall_studios_schools',
                  'dating_escort_services',
                  'dentists_orthodontists',
                  'department_stores',
                  'detective_agencies',
                  'digital_goods_applications',
                  'digital_goods_games',
                  'digital_goods_large_volume',
                  'digital_goods_media',
                  'direct_marketing_catalog_merchant',
                  'direct_marketing_combination_catalog_and_retail_merchant',
                  'direct_marketing_inbound_telemarketing',
                  'direct_marketing_insurance_services',
                  'direct_marketing_other',
                  'direct_marketing_outbound_telemarketing',
                  'direct_marketing_subscription',
                  'direct_marketing_travel',
                  'discount_stores',
                  'doctors',
                  'door_to_door_sales',
                  'drapery_window_covering_and_upholstery_stores',
                  'drinking_places',
                  'drug_stores_and_pharmacies',
                  'drugs_drug_proprietaries_and_druggist_sundries',
                  'dry_cleaners',
                  'durable_goods',
                  'duty_free_stores',
                  'eating_places_restaurants',
                  'educational_services',
                  'electric_razor_stores',
                  'electric_vehicle_charging',
                  'electrical_parts_and_equipment',
                  'electrical_services',
                  'electronics_repair_shops',
                  'electronics_stores',
                  'elementary_secondary_schools',
                  'emergency_services_gcas_visa_use_only',
                  'employment_temp_agencies',
                  'equipment_rental',
                  'exterminating_services',
                  'family_clothing_stores',
                  'fast_food_restaurants',
                  'financial_institutions',
                  'fines_government_administrative_entities',
                  'fireplace_fireplace_screens_and_accessories_stores',
                  'floor_covering_stores',
                  'florists',
                  'florists_supplies_nursery_stock_and_flowers',
                  'freezer_and_locker_meat_provisioners',
                  'fuel_dealers_non_automotive',
                  'funeral_services_crematories',
                  'furniture_home_furnishings_and_equipment_stores_except_appliances',
                  'furniture_repair_refinishing',
                  'furriers_and_fur_shops',
                  'general_services',
                  'gift_card_novelty_and_souvenir_shops',
                  'glass_paint_and_wallpaper_stores',
                  'glassware_crystal_stores',
                  'golf_courses_public',
                  'government_licensed_horse_dog_racing_us_region_only',
                  'government_licensed_online_casions_online_gambling_us_region_only',
                  'government_owned_lotteries_non_us_region',
                  'government_owned_lotteries_us_region_only',
                  'government_services',
                  'grocery_stores_supermarkets',
                  'hardware_equipment_and_supplies',
                  'hardware_stores',
                  'health_and_beauty_spas',
                  'hearing_aids_sales_and_supplies',
                  'heating_plumbing_a_c',
                  'hobby_toy_and_game_shops',
                  'home_supply_warehouse_stores',
                  'hospitals',
                  'hotels_motels_and_resorts',
                  'household_appliance_stores',
                  'industrial_supplies',
                  'information_retrieval_services',
                  'insurance_default',
                  'insurance_underwriting_premiums',
                  'intra_company_purchases',
                  'jewelry_stores_watches_clocks_and_silverware_stores',
                  'landscaping_services',
                  'laundries',
                  'laundry_cleaning_services',
                  'legal_services_attorneys',
                  'luggage_and_leather_goods_stores',
                  'lumber_building_materials_stores',
                  'manual_cash_disburse',
                  'marinas_service_and_supplies',
                  'marketplaces',
                  'masonry_stonework_and_plaster',
                  'massage_parlors',
                  'medical_and_dental_labs',
                  'medical_dental_ophthalmic_and_hospital_equipment_and_supplies',
                  'medical_services',
                  'membership_organizations',
                  'mens_and_boys_clothing_and_accessories_stores',
                  'mens_womens_clothing_stores',
                  'metal_service_centers',
                  'miscellaneous_apparel_and_accessory_shops',
                  'miscellaneous_auto_dealers',
                  'miscellaneous_business_services',
                  'miscellaneous_food_stores',
                  'miscellaneous_general_merchandise',
                  'miscellaneous_general_services',
                  'miscellaneous_home_furnishing_specialty_stores',
                  'miscellaneous_publishing_and_printing',
                  'miscellaneous_recreation_services',
                  'miscellaneous_repair_shops',
                  'miscellaneous_specialty_retail',
                  'mobile_home_dealers',
                  'motion_picture_theaters',
                  'motor_freight_carriers_and_trucking',
                  'motor_homes_dealers',
                  'motor_vehicle_supplies_and_new_parts',
                  'motorcycle_shops_and_dealers',
                  'motorcycle_shops_dealers',
                  'music_stores_musical_instruments_pianos_and_sheet_music',
                  'news_dealers_and_newsstands',
                  'non_fi_money_orders',
                  'non_fi_stored_value_card_purchase_load',
                  'nondurable_goods',
                  'nurseries_lawn_and_garden_supply_stores',
                  'nursing_personal_care',
                  'office_and_commercial_furniture',
                  'opticians_eyeglasses',
                  'optometrists_ophthalmologist',
                  'orthopedic_goods_prosthetic_devices',
                  'osteopaths',
                  'package_stores_beer_wine_and_liquor',
                  'paints_varnishes_and_supplies',
                  'parking_lots_garages',
                  'passenger_railways',
                  'pawn_shops',
                  'pet_shops_pet_food_and_supplies',
                  'petroleum_and_petroleum_products',
                  'photo_developing',
                  'photographic_photocopy_microfilm_equipment_and_supplies',
                  'photographic_studios',
                  'picture_video_production',
                  'piece_goods_notions_and_other_dry_goods',
                  'plumbing_heating_equipment_and_supplies',
                  'political_organizations',
                  'postal_services_government_only',
                  'precious_stones_and_metals_watches_and_jewelry',
                  'professional_services',
                  'public_warehousing_and_storage',
                  'quick_copy_repro_and_blueprint',
                  'railroads',
                  'real_estate_agents_and_managers_rentals',
                  'record_stores',
                  'recreational_vehicle_rentals',
                  'religious_goods_stores',
                  'religious_organizations',
                  'roofing_siding_sheet_metal',
                  'secretarial_support_services',
                  'security_brokers_dealers',
                  'service_stations',
                  'sewing_needlework_fabric_and_piece_goods_stores',
                  'shoe_repair_hat_cleaning',
                  'shoe_stores',
                  'small_appliance_repair',
                  'snowmobile_dealers',
                  'special_trade_services',
                  'specialty_cleaning',
                  'sporting_goods_stores',
                  'sporting_recreation_camps',
                  'sports_and_riding_apparel_stores',
                  'sports_clubs_fields',
                  'stamp_and_coin_stores',
                  'stationary_office_supplies_printing_and_writing_paper',
                  'stationery_stores_office_and_school_supply_stores',
                  'swimming_pools_sales',
                  't_ui_travel_germany',
                  'tailors_alterations',
                  'tax_payments_government_agencies',
                  'tax_preparation_services',
                  'taxicabs_limousines',
                  'telecommunication_equipment_and_telephone_sales',
                  'telecommunication_services',
                  'telegraph_services',
                  'tent_and_awning_shops',
                  'testing_laboratories',
                  'theatrical_ticket_agencies',
                  'timeshares',
                  'tire_retreading_and_repair',
                  'tolls_bridge_fees',
                  'tourist_attractions_and_exhibits',
                  'towing_services',
                  'trailer_parks_campgrounds',
                  'transportation_services',
                  'travel_agencies_tour_operators',
                  'truck_stop_iteration',
                  'truck_utility_trailer_rentals',
                  'typesetting_plate_making_and_related_services',
                  'typewriter_stores',
                  'u_s_federal_government_agencies_or_departments',
                  'uniforms_commercial_clothing',
                  'used_merchandise_and_secondhand_stores',
                  'utilities',
                  'variety_stores',
                  'veterinary_services',
                  'video_amusement_game_supplies',
                  'video_game_arcades',
                  'video_tape_rental_stores',
                  'vocational_trade_schools',
                  'watch_jewelry_repair',
                  'welding_repair',
                  'wholesale_clubs',
                  'wig_and_toupee_stores',
                  'wires_money_orders',
                  'womens_accessory_and_specialty_shops',
                  'womens_ready_to_wear_stores',
                  'wrecking_and_salvage_yards',
                ])
                .optional(),
              city: z.string().optional(),
              country: z.string().optional(),
              name: z.string().optional(),
              network_id: z.string().optional(),
              postal_code: z.string().optional(),
              state: z.string().optional(),
              terminal_id: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
          purchase_details: z
            .object({
              fleet: z
                .object({
                  cardholder_prompt_data: z
                    .object({
                      driver_id: z.string().optional(),
                      odometer: z.number().int().safe().finite().optional(),
                      unspecified_id: z.string().optional(),
                      user_id: z.string().optional(),
                      vehicle_number: z.string().optional(),
                    })
                    .optional(),
                  purchase_type: z
                    .enum([
                      'fuel_and_non_fuel_purchase',
                      'fuel_purchase',
                      'non_fuel_purchase',
                    ])
                    .optional(),
                  reported_breakdown: z
                    .object({
                      fuel: z
                        .object({
                          gross_amount_decimal: z.string().optional(),
                        })
                        .optional(),
                      non_fuel: z
                        .object({
                          gross_amount_decimal: z.string().optional(),
                        })
                        .optional(),
                      tax: z
                        .object({
                          local_amount_decimal: z.string().optional(),
                          national_amount_decimal: z.string().optional(),
                        })
                        .optional(),
                    })
                    .optional(),
                  service_type: z
                    .enum([
                      'full_service',
                      'non_fuel_transaction',
                      'self_service',
                    ])
                    .optional(),
                })
                .optional(),
              flight: z
                .object({
                  departure_at: z.number().int().safe().finite().optional(),
                  passenger_name: z.string().optional(),
                  refundable: z.boolean().optional(),
                  segments: z
                    .array(
                      z.object({
                        arrival_airport_code: z.string().optional(),
                        carrier: z.string().optional(),
                        departure_airport_code: z.string().optional(),
                        flight_number: z.string().optional(),
                        service_class: z.string().optional(),
                        stopover_allowed: z.boolean().optional(),
                      })
                    )
                    .optional(),
                  travel_agency: z.string().optional(),
                })
                .optional(),
              fuel: z
                .object({
                  industry_product_code: z.string().optional(),
                  quantity_decimal: z.string().optional(),
                  type: z
                    .enum([
                      'diesel',
                      'other',
                      'unleaded_plus',
                      'unleaded_regular',
                      'unleaded_super',
                    ])
                    .optional(),
                  unit: z
                    .enum([
                      'charging_minute',
                      'imperial_gallon',
                      'kilogram',
                      'kilowatt_hour',
                      'liter',
                      'other',
                      'pound',
                      'us_gallon',
                    ])
                    .optional(),
                  unit_cost_decimal: z.string().optional(),
                })
                .optional(),
              lodging: z
                .object({
                  check_in_at: z.number().int().safe().finite().optional(),
                  nights: z.number().int().safe().finite().optional(),
                })
                .optional(),
              receipt: z
                .array(
                  z.object({
                    description: z.string().optional(),
                    quantity: z.string().optional(),
                    total: z.number().int().safe().finite().optional(),
                    unit_cost: z.number().int().safe().finite().optional(),
                  })
                )
                .optional(),
              reference: z.string().optional(),
            })
            .optional(),
        }),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Issuing_Transaction,
          },
        },
      },
      default: {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Error,
          },
        },
      },
    },
  };

export type PostTestHelpersIssuingTransactionsCreateUnlinkedRefundRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        amount: number; // int
        card: string;
        currency?: string;
        expand?: string[];
        merchant_data?: {
          category?:
            | 'ac_refrigeration_repair'
            | 'accounting_bookkeeping_services'
            | 'advertising_services'
            | 'agricultural_cooperative'
            | 'airlines_air_carriers'
            | 'airports_flying_fields'
            | 'ambulance_services'
            | 'amusement_parks_carnivals'
            | 'antique_reproductions'
            | 'antique_shops'
            | 'aquariums'
            | 'architectural_surveying_services'
            | 'art_dealers_and_galleries'
            | 'artists_supply_and_craft_shops'
            | 'auto_and_home_supply_stores'
            | 'auto_body_repair_shops'
            | 'auto_paint_shops'
            | 'auto_service_shops'
            | 'automated_cash_disburse'
            | 'automated_fuel_dispensers'
            | 'automobile_associations'
            | 'automotive_parts_and_accessories_stores'
            | 'automotive_tire_stores'
            | 'bail_and_bond_payments'
            | 'bakeries'
            | 'bands_orchestras'
            | 'barber_and_beauty_shops'
            | 'betting_casino_gambling'
            | 'bicycle_shops'
            | 'billiard_pool_establishments'
            | 'boat_dealers'
            | 'boat_rentals_and_leases'
            | 'book_stores'
            | 'books_periodicals_and_newspapers'
            | 'bowling_alleys'
            | 'bus_lines'
            | 'business_secretarial_schools'
            | 'buying_shopping_services'
            | 'cable_satellite_and_other_pay_television_and_radio'
            | 'camera_and_photographic_supply_stores'
            | 'candy_nut_and_confectionery_stores'
            | 'car_and_truck_dealers_new_used'
            | 'car_and_truck_dealers_used_only'
            | 'car_rental_agencies'
            | 'car_washes'
            | 'carpentry_services'
            | 'carpet_upholstery_cleaning'
            | 'caterers'
            | 'charitable_and_social_service_organizations_fundraising'
            | 'chemicals_and_allied_products'
            | 'child_care_services'
            | 'childrens_and_infants_wear_stores'
            | 'chiropodists_podiatrists'
            | 'chiropractors'
            | 'cigar_stores_and_stands'
            | 'civic_social_fraternal_associations'
            | 'cleaning_and_maintenance'
            | 'clothing_rental'
            | 'colleges_universities'
            | 'commercial_equipment'
            | 'commercial_footwear'
            | 'commercial_photography_art_and_graphics'
            | 'commuter_transport_and_ferries'
            | 'computer_network_services'
            | 'computer_programming'
            | 'computer_repair'
            | 'computer_software_stores'
            | 'computers_peripherals_and_software'
            | 'concrete_work_services'
            | 'construction_materials'
            | 'consulting_public_relations'
            | 'correspondence_schools'
            | 'cosmetic_stores'
            | 'counseling_services'
            | 'country_clubs'
            | 'courier_services'
            | 'court_costs'
            | 'credit_reporting_agencies'
            | 'cruise_lines'
            | 'dairy_products_stores'
            | 'dance_hall_studios_schools'
            | 'dating_escort_services'
            | 'dentists_orthodontists'
            | 'department_stores'
            | 'detective_agencies'
            | 'digital_goods_applications'
            | 'digital_goods_games'
            | 'digital_goods_large_volume'
            | 'digital_goods_media'
            | 'direct_marketing_catalog_merchant'
            | 'direct_marketing_combination_catalog_and_retail_merchant'
            | 'direct_marketing_inbound_telemarketing'
            | 'direct_marketing_insurance_services'
            | 'direct_marketing_other'
            | 'direct_marketing_outbound_telemarketing'
            | 'direct_marketing_subscription'
            | 'direct_marketing_travel'
            | 'discount_stores'
            | 'doctors'
            | 'door_to_door_sales'
            | 'drapery_window_covering_and_upholstery_stores'
            | 'drinking_places'
            | 'drug_stores_and_pharmacies'
            | 'drugs_drug_proprietaries_and_druggist_sundries'
            | 'dry_cleaners'
            | 'durable_goods'
            | 'duty_free_stores'
            | 'eating_places_restaurants'
            | 'educational_services'
            | 'electric_razor_stores'
            | 'electric_vehicle_charging'
            | 'electrical_parts_and_equipment'
            | 'electrical_services'
            | 'electronics_repair_shops'
            | 'electronics_stores'
            | 'elementary_secondary_schools'
            | 'emergency_services_gcas_visa_use_only'
            | 'employment_temp_agencies'
            | 'equipment_rental'
            | 'exterminating_services'
            | 'family_clothing_stores'
            | 'fast_food_restaurants'
            | 'financial_institutions'
            | 'fines_government_administrative_entities'
            | 'fireplace_fireplace_screens_and_accessories_stores'
            | 'floor_covering_stores'
            | 'florists'
            | 'florists_supplies_nursery_stock_and_flowers'
            | 'freezer_and_locker_meat_provisioners'
            | 'fuel_dealers_non_automotive'
            | 'funeral_services_crematories'
            | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
            | 'furniture_repair_refinishing'
            | 'furriers_and_fur_shops'
            | 'general_services'
            | 'gift_card_novelty_and_souvenir_shops'
            | 'glass_paint_and_wallpaper_stores'
            | 'glassware_crystal_stores'
            | 'golf_courses_public'
            | 'government_licensed_horse_dog_racing_us_region_only'
            | 'government_licensed_online_casions_online_gambling_us_region_only'
            | 'government_owned_lotteries_non_us_region'
            | 'government_owned_lotteries_us_region_only'
            | 'government_services'
            | 'grocery_stores_supermarkets'
            | 'hardware_equipment_and_supplies'
            | 'hardware_stores'
            | 'health_and_beauty_spas'
            | 'hearing_aids_sales_and_supplies'
            | 'heating_plumbing_a_c'
            | 'hobby_toy_and_game_shops'
            | 'home_supply_warehouse_stores'
            | 'hospitals'
            | 'hotels_motels_and_resorts'
            | 'household_appliance_stores'
            | 'industrial_supplies'
            | 'information_retrieval_services'
            | 'insurance_default'
            | 'insurance_underwriting_premiums'
            | 'intra_company_purchases'
            | 'jewelry_stores_watches_clocks_and_silverware_stores'
            | 'landscaping_services'
            | 'laundries'
            | 'laundry_cleaning_services'
            | 'legal_services_attorneys'
            | 'luggage_and_leather_goods_stores'
            | 'lumber_building_materials_stores'
            | 'manual_cash_disburse'
            | 'marinas_service_and_supplies'
            | 'marketplaces'
            | 'masonry_stonework_and_plaster'
            | 'massage_parlors'
            | 'medical_and_dental_labs'
            | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
            | 'medical_services'
            | 'membership_organizations'
            | 'mens_and_boys_clothing_and_accessories_stores'
            | 'mens_womens_clothing_stores'
            | 'metal_service_centers'
            | 'miscellaneous_apparel_and_accessory_shops'
            | 'miscellaneous_auto_dealers'
            | 'miscellaneous_business_services'
            | 'miscellaneous_food_stores'
            | 'miscellaneous_general_merchandise'
            | 'miscellaneous_general_services'
            | 'miscellaneous_home_furnishing_specialty_stores'
            | 'miscellaneous_publishing_and_printing'
            | 'miscellaneous_recreation_services'
            | 'miscellaneous_repair_shops'
            | 'miscellaneous_specialty_retail'
            | 'mobile_home_dealers'
            | 'motion_picture_theaters'
            | 'motor_freight_carriers_and_trucking'
            | 'motor_homes_dealers'
            | 'motor_vehicle_supplies_and_new_parts'
            | 'motorcycle_shops_and_dealers'
            | 'motorcycle_shops_dealers'
            | 'music_stores_musical_instruments_pianos_and_sheet_music'
            | 'news_dealers_and_newsstands'
            | 'non_fi_money_orders'
            | 'non_fi_stored_value_card_purchase_load'
            | 'nondurable_goods'
            | 'nurseries_lawn_and_garden_supply_stores'
            | 'nursing_personal_care'
            | 'office_and_commercial_furniture'
            | 'opticians_eyeglasses'
            | 'optometrists_ophthalmologist'
            | 'orthopedic_goods_prosthetic_devices'
            | 'osteopaths'
            | 'package_stores_beer_wine_and_liquor'
            | 'paints_varnishes_and_supplies'
            | 'parking_lots_garages'
            | 'passenger_railways'
            | 'pawn_shops'
            | 'pet_shops_pet_food_and_supplies'
            | 'petroleum_and_petroleum_products'
            | 'photo_developing'
            | 'photographic_photocopy_microfilm_equipment_and_supplies'
            | 'photographic_studios'
            | 'picture_video_production'
            | 'piece_goods_notions_and_other_dry_goods'
            | 'plumbing_heating_equipment_and_supplies'
            | 'political_organizations'
            | 'postal_services_government_only'
            | 'precious_stones_and_metals_watches_and_jewelry'
            | 'professional_services'
            | 'public_warehousing_and_storage'
            | 'quick_copy_repro_and_blueprint'
            | 'railroads'
            | 'real_estate_agents_and_managers_rentals'
            | 'record_stores'
            | 'recreational_vehicle_rentals'
            | 'religious_goods_stores'
            | 'religious_organizations'
            | 'roofing_siding_sheet_metal'
            | 'secretarial_support_services'
            | 'security_brokers_dealers'
            | 'service_stations'
            | 'sewing_needlework_fabric_and_piece_goods_stores'
            | 'shoe_repair_hat_cleaning'
            | 'shoe_stores'
            | 'small_appliance_repair'
            | 'snowmobile_dealers'
            | 'special_trade_services'
            | 'specialty_cleaning'
            | 'sporting_goods_stores'
            | 'sporting_recreation_camps'
            | 'sports_and_riding_apparel_stores'
            | 'sports_clubs_fields'
            | 'stamp_and_coin_stores'
            | 'stationary_office_supplies_printing_and_writing_paper'
            | 'stationery_stores_office_and_school_supply_stores'
            | 'swimming_pools_sales'
            | 't_ui_travel_germany'
            | 'tailors_alterations'
            | 'tax_payments_government_agencies'
            | 'tax_preparation_services'
            | 'taxicabs_limousines'
            | 'telecommunication_equipment_and_telephone_sales'
            | 'telecommunication_services'
            | 'telegraph_services'
            | 'tent_and_awning_shops'
            | 'testing_laboratories'
            | 'theatrical_ticket_agencies'
            | 'timeshares'
            | 'tire_retreading_and_repair'
            | 'tolls_bridge_fees'
            | 'tourist_attractions_and_exhibits'
            | 'towing_services'
            | 'trailer_parks_campgrounds'
            | 'transportation_services'
            | 'travel_agencies_tour_operators'
            | 'truck_stop_iteration'
            | 'truck_utility_trailer_rentals'
            | 'typesetting_plate_making_and_related_services'
            | 'typewriter_stores'
            | 'u_s_federal_government_agencies_or_departments'
            | 'uniforms_commercial_clothing'
            | 'used_merchandise_and_secondhand_stores'
            | 'utilities'
            | 'variety_stores'
            | 'veterinary_services'
            | 'video_amusement_game_supplies'
            | 'video_game_arcades'
            | 'video_tape_rental_stores'
            | 'vocational_trade_schools'
            | 'watch_jewelry_repair'
            | 'welding_repair'
            | 'wholesale_clubs'
            | 'wig_and_toupee_stores'
            | 'wires_money_orders'
            | 'womens_accessory_and_specialty_shops'
            | 'womens_ready_to_wear_stores'
            | 'wrecking_and_salvage_yards';
          city?: string;
          country?: string;
          name?: string;
          network_id?: string;
          postal_code?: string;
          state?: string;
          terminal_id?: string;
          url?: string;
        };
        purchase_details?: {
          fleet?: {
            cardholder_prompt_data?: {
              driver_id?: string;
              odometer?: number; // int
              unspecified_id?: string;
              user_id?: string;
              vehicle_number?: string;
            };
            purchase_type?:
              | 'fuel_and_non_fuel_purchase'
              | 'fuel_purchase'
              | 'non_fuel_purchase';
            reported_breakdown?: {
              fuel?: {
                gross_amount_decimal?: string; // decimal
              };
              non_fuel?: {
                gross_amount_decimal?: string; // decimal
              };
              tax?: {
                local_amount_decimal?: string; // decimal
                national_amount_decimal?: string; // decimal
              };
            };
            service_type?:
              | 'full_service'
              | 'non_fuel_transaction'
              | 'self_service';
          };
          flight?: {
            departure_at?: number; // int
            passenger_name?: string;
            refundable?: boolean;
            segments?: {
              arrival_airport_code?: string;
              carrier?: string;
              departure_airport_code?: string;
              flight_number?: string;
              service_class?: string;
              stopover_allowed?: boolean;
            }[];
            travel_agency?: string;
          };
          fuel?: {
            industry_product_code?: string;
            quantity_decimal?: string; // decimal
            type?:
              | 'diesel'
              | 'other'
              | 'unleaded_plus'
              | 'unleaded_regular'
              | 'unleaded_super';
            unit?:
              | 'charging_minute'
              | 'imperial_gallon'
              | 'kilogram'
              | 'kilowatt_hour'
              | 'liter'
              | 'other'
              | 'pound'
              | 'us_gallon';
            unit_cost_decimal?: string; // decimal
          };
          lodging?: {
            check_in_at?: number; // int
            nights?: number; // int
          };
          receipt?: {
            description?: string;
            quantity?: string; // decimal
            total?: number; // int
            unit_cost?: number; // int
          }[];
          reference?: string;
        };
      }
    >
  >;

export type PostTestHelpersIssuingTransactionsCreateUnlinkedRefundResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingTransactionsCreateUnlinkedRefundRequestResult =
  RequestResult<
    PostTestHelpersIssuingTransactionsCreateUnlinkedRefundRequest,
    PostTestHelpersIssuingTransactionsCreateUnlinkedRefundResponse
  >;

export function postTestHelpersIssuingTransactionsCreateUnlinkedRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingTransactionsCreateUnlinkedRefundRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingTransactionsCreateUnlinkedRefundRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingTransactionsCreateUnlinkedRefundEndpointSchema,
      payload
    ),
    config
  );
}
